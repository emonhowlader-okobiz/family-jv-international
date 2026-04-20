import { AppError } from "../../errors/AppError";
import { User, UserRole, Host } from "../../models";
import type { ApplyHostInput, UpdateHostInput } from "./host.validation";
import { TPaginationOptions } from "../../types/pagination";
import { calculatePagination } from "../../utils/calculatePagination";

const applyHost = async (userId: string, data: ApplyHostInput) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.isDeleted) {
    throw new AppError("This account has been deleted", 403);
  }

  const existingHost = await Host.findOne({ userId });

  if (existingHost) {
    // If user already has a host profile, just update it
    existingHost.businessName = data.business_name;
    existingHost.nidNumber = data.nid_number;
    await existingHost.save();
    return existingHost;
  }

  // Promote user to HOST role if not already
  if (user.role !== UserRole.HOST) {
    user.role = UserRole.HOST;
    await user.save();
  }

  const host = new Host({
    userId,
    businessName: data.business_name,
    nidNumber: data.nid_number,
  });

  await host.save();
  return host;
};

const getHostByUserId = async (userId: string) => {
  const host = await Host.findOne({ userId }).populate('user', '_id name email role status');

  if (!host) {
    throw new AppError("Host profile not found", 404);
  }

  return {
    ...host.toObject(),
    user: host.user ? {
      id: (host.user as any)._id.toString(),
      name: (host.user as any).name,
      email: (host.user as any).email,
      role: (host.user as any).role,
      status: (host.user as any).status,
    } : null,
  };
};

const updateHost = async (userId: string, data: UpdateHostInput) => {
  const host = await Host.findOne({ userId });
  if (!host) {
    throw new AppError("Host profile not found", 404);
  }

  host.businessName = data.business_name;
  host.nidNumber = data.nid_number;
  await host.save();

  return host;
};

const listHosts = async (
  filters: { isApproved?: string },
  options: TPaginationOptions
) => {
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);

  const where: any = {};

  if (filters.isApproved !== undefined) {
    where.isApproved = filters.isApproved === "true";
  }

  const total = await Host.countDocuments(where);
  const hosts = await Host.find(where)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .populate('user', '_id name email role status');

  return { hosts: hosts.map(h => ({
    ...h.toObject(),
    user: h.user ? {
      id: (h.user as any)._id.toString(),
      name: (h.user as any).name,
      email: (h.user as any).email,
      role: (h.user as any).role,
      status: (h.user as any).status,
    } : null,
  })), total, page, limit };
};


const getHostById = async (id: string) => {
  const host = await Host.findById(id).populate('user', '_id name email role status');

  if (!host) {
    throw new AppError("Host profile not found", 404);
  }

  return {
    ...host.toObject(),
    user: host.user ? {
      id: (host.user as any)._id.toString(),
      name: (host.user as any).name,
      email: (host.user as any).email,
      role: (host.user as any).role,
      status: (host.user as any).status,
    } : null,
  };
};

const approveHost = async (id: string) => {
  const host = await Host.findById(id);
  if (!host) {
    throw new AppError("Host profile not found", 404);
  }

  host.isApproved = true;
  host.approvedAt = new Date();
  await host.save();

  return host;
};

export const HostService = {
  applyHost,
  getHostByUserId,
  updateHost,
  listHosts,
  getHostById,
  approveHost,
};
