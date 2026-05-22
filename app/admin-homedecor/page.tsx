"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  ShoppingCart,
  Palette,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

interface DashboardStats {
  stats: {
    totalProducts: number;
    activeProducts: number;
    totalInquiries: number;
    pendingInquiries: number;
    totalCustomizations: number;
    pendingCustomizations: number;
    totalUsers: number;
    totalLeads: number;
    estimatedRevenue: number;
  };
  recent: {
    inquiries: Array<{
      _id: string;
      inquiryNumber: string;
      status: string;
      totalAmount: number;
      createdAt: string;
    }>;
    customizations: Array<{
      _id: string;
      requestNumber: string;
      status: string;
      createdAt: string;
    }>;
  };
}

const statCards = [
  { key: "totalProducts", label: "Total Products", icon: Package, color: "bg-blue-500" },
  { key: "totalInquiries", label: "Total Inquiries", icon: ShoppingCart, color: "bg-green-500" },
  { key: "totalCustomizations", label: "Customizations", icon: Palette, color: "bg-purple-500" },
  { key: "totalUsers", label: "Total Users", icon: Users, color: "bg-orange-500" },
];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-500",
  reviewed: "bg-blue-500/10 text-blue-500",
  quoted: "bg-purple-500/10 text-purple-500",
  approved: "bg-green-500/10 text-green-500",
  completed: "bg-green-500/10 text-green-500",
  rejected: "bg-red-500/10 text-red-500",
  cancelled: "bg-neutral-500/10 text-neutral-500",
};

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch("/api/admin/dashboard");
        if (res.ok) {
          const data = await res.json();
          setData(data);
        }
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-serif">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="bg-neutral-900 border-neutral-800">
              <CardContent className="p-6">
                <div className="h-20 animate-pulse bg-neutral-800 rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const stats = data?.stats || {
    totalProducts: 0,
    activeProducts: 0,
    totalInquiries: 0,
    pendingInquiries: 0,
    totalCustomizations: 0,
    pendingCustomizations: 0,
    totalUsers: 0,
    totalLeads: 0,
    estimatedRevenue: 0,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif mb-1">Dashboard</h1>
        <p className="text-neutral-500">Welcome to Zee Collection Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const value = stats[card.key as keyof typeof stats];
          return (
            <Card key={card.key} className="bg-neutral-900 border-neutral-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center`}>
                    <card.icon className="w-5 h-5 text-white" />
                  </div>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
                <p className="text-3xl font-light mb-1">{value}</p>
                <p className="text-sm text-neutral-500">{card.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Revenue Card */}
      <Card className="bg-neutral-900 border-neutral-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-500 mb-1">Estimated Revenue</p>
              <p className="text-4xl font-light">${stats.estimatedRevenue.toLocaleString()}</p>
            </div>
            <div className="w-14 h-14 rounded-xl bg-green-500 flex items-center justify-center">
              <DollarSign className="w-7 h-7 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pending Items */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pending Inquiries */}
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader className="border-b border-neutral-800">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Pending Inquiries</CardTitle>
              <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500">
                {stats.pendingInquiries} pending
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {data?.recent.inquiries.length ? (
              <div className="divide-y divide-neutral-800">
                {data.recent.inquiries.slice(0, 5).map((inquiry) => (
                  <Link
                    key={inquiry._id}
                    href={`/admin-homedecor/inquiries/${inquiry._id}`}
                    className="flex items-center justify-between p-4 hover:bg-neutral-800/50 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-sm">{inquiry.inquiryNumber}</p>
                      <p className="text-xs text-neutral-500 flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        {new Date(inquiry.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={statusColors[inquiry.status] || statusColors.pending}>
                        {inquiry.status}
                      </Badge>
                      <ArrowUpRight className="w-4 h-4 text-neutral-600" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-neutral-500">No recent inquiries</div>
            )}
          </CardContent>
        </Card>

        {/* Pending Customizations */}
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader className="border-b border-neutral-800">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Customization Requests</CardTitle>
              <Badge variant="secondary" className="bg-purple-500/10 text-purple-500">
                {stats.pendingCustomizations} pending
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {data?.recent.customizations.length ? (
              <div className="divide-y divide-neutral-800">
                {data.recent.customizations.slice(0, 5).map((request) => (
                  <Link
                    key={request._id}
                    href={`/admin-homedecor/customizations/${request._id}`}
                    className="flex items-center justify-between p-4 hover:bg-neutral-800/50 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-sm">{request.requestNumber}</p>
                      <p className="text-xs text-neutral-500 flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        {new Date(request.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={statusColors[request.status] || statusColors.pending}>
                        {request.status}
                      </Badge>
                      <ArrowUpRight className="w-4 h-4 text-neutral-600" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-neutral-500">No recent requests</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-neutral-900 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/admin-homedecor/products/new"
              className="flex flex-col items-center justify-center p-6 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors text-center"
            >
              <Package className="w-8 h-8 mb-3 text-blue-500" />
              <span className="text-sm font-medium">Add Product</span>
            </Link>
            <Link
              href="/admin-homedecor/users/new"
              className="flex flex-col items-center justify-center p-6 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors text-center"
            >
              <Users className="w-8 h-8 mb-3 text-orange-500" />
              <span className="text-sm font-medium">Add User</span>
            </Link>
            <Link
              href="/admin-homedecor/inquiries?status=pending"
              className="flex flex-col items-center justify-center p-6 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors text-center"
            >
              <ShoppingCart className="w-8 h-8 mb-3 text-green-500" />
              <span className="text-sm font-medium">View Inquiries</span>
            </Link>
            <Link
              href="/admin-homedecor/customizations?status=pending"
              className="flex flex-col items-center justify-center p-6 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors text-center"
            >
              <Palette className="w-8 h-8 mb-3 text-purple-500" />
              <span className="text-sm font-medium">View Requests</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
