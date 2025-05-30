"use client";
import Pagination from "@/app/_components/Pagnation";
import UsersTable from "@/app/_components/UsersTable";
import ProtectedRoute from "@/app/hooks/UseProtectedRoute";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
};

const Users = () => {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        setUsersList(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = usersList.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setUsersList((prevUsers) =>
          prevUsers.filter((user) => user.id !== userId)
        );
        toast.success(`User with ID ${userId} deleted successfully!`);
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="">
        <div className="w-full p-4 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold">Users</CardTitle>
                  <CardDescription>Manage your Users</CardDescription>
                </div>
                <Button className="flex items-center gap-1">
                  <Link href="/add-user" className="flex items-center gap-1">
                    <Plus className="h-4 w-4" />
                    <span>Add User</span>
                  </Link>
                </Button>
              </div>
            </CardHeader>
          </Card>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search users by name..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>

            <div className="rounded-md border">
              <UsersTable
                users={currentUsers}
                isLoading={isLoading}
                onDeleteUser={handleDeleteUser}
              />
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onNext={handleNextPage}
              onPrev={handlePrevPage}
            />
          </CardContent>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Users;
