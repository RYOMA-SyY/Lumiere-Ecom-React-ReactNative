import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useStore } from "../lib/store";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { motion } from "framer-motion";
import { User, MapPin, ShoppingBag, LogOut, Edit2 } from "lucide-react";

export default function Profile() {
  const { t } = useTranslation();
  const user = useStore((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1 (555) 123-4567",
  });

  const mockOrders = [
    {
      id: "ORD-001",
      date: "Dec 20, 2025",
      total: 299.98,
      status: "Delivered",
      items: 2,
    },
    {
      id: "ORD-002",
      date: "Dec 10, 2025",
      total: 89.99,
      status: "In Transit",
      items: 1,
    },
    {
      id: "ORD-003",
      date: "Nov 28, 2025",
      total: 549.97,
      status: "Delivered",
      items: 3,
    },
  ];

  const addresses = [
    {
      id: 1,
      type: "Home",
      name: "Sarah Johnson",
      address: "123 Main St",
      city: "New York, NY 10001",
      default: true,
    },
    {
      id: 2,
      type: "Work",
      name: "Sarah Johnson",
      address: "456 Business Ave",
      city: "New York, NY 10002",
      default: false,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 pb-8 border-b border-border">
          <div className="flex items-center gap-6 mb-6 md:mb-0">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                SJ
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-4xl font-bold">{profile.name}</h1>
              <p className="text-muted-foreground">{profile.email}</p>
            </div>
          </div>
          <Button variant="outline" className="rounded-xl">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="orders" className="space-y-8">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Addresses</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Order History</h2>
            {mockOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors"
              >
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Order ID</p>
                    <p className="font-semibold">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-semibold">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Items</p>
                    <p className="font-semibold">{order.items} items</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="font-bold text-primary text-lg">${order.total}</p>
                  </div>
                  <div className="flex items-end gap-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p
                        className={`font-semibold text-sm ${
                          order.status === "Delivered"
                            ? "text-green-600"
                            : "text-orange-600"
                        }`}
                      >
                        {order.status}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-lg">
                      View
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses" className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Saved Addresses</h2>
              <Button className="rounded-xl">+ Add Address</Button>
            </div>
            {addresses.map((addr, index) => (
              <motion.div
                key={addr.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-6 bg-card rounded-xl border border-border relative"
              >
                {addr.default && (
                  <div className="absolute top-3 right-3">
                    <span className="text-xs font-semibold bg-primary text-primary-foreground px-2 py-1 rounded-full">
                      Default
                    </span>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-lg font-semibold mb-2">{addr.type}</p>
                    <p className="text-foreground">{addr.name}</p>
                    <p className="text-muted-foreground">{addr.address}</p>
                    <p className="text-muted-foreground">{addr.city}</p>
                  </div>
                  <div className="flex items-end gap-2">
                    <Button variant="outline" size="sm" className="rounded-lg">
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    {!addr.default && (
                      <Button variant="ghost" size="sm" className="text-destructive">
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
            <div className="max-w-md space-y-6">
              {isEditing ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile({ ...profile, phone: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setIsEditing(false)}
                      className="flex-1 rounded-xl"
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 rounded-xl"
                    >
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-semibold">{profile.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-semibold">{profile.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-semibold">{profile.phone}</p>
                  </div>
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="rounded-xl"
                  >
                    <Edit2 className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
