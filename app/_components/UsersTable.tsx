
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import EditUserModal from "./EditUserModal";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
};

interface UsersTableProps {
  users: User[];
  isLoading: boolean;
  onDeleteUser: (userId: number) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({
  users,
  isLoading,
  onDeleteUser,
}) => {

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          // Show 5 skeleton rows while loading
          Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-4 w-6" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-32" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell className="flex gap-2">
                <Skeleton className="h-8 w-12 rounded-md" />
                <Skeleton className="h-8 w-14 rounded-md" />
              </TableCell>
            </TableRow>
          ))
        ) : users.length > 0 ? (
          users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell className="flex gap-2">
                <EditUserModal user={user} />
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDeleteUser(user.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-center text-muted-foreground"
            >
              No users found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
