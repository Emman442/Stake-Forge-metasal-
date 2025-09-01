import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Link as LinkIcon, Users, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const createdPools = [
  { id: '1', name: 'My Awesome Pool', tvl: 1250345.67, stakers: 432, status: 'Live' },
  { id: '2', name: 'Community Fund', tvl: 78045.12, stakers: 102, status: 'Live' },
  { id: '3', name: 'Dev Team Staking', tvl: 0, stakers: 0, status: 'Draft' },
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24 space-y-12">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-glow font-headline">
            My Dashboard
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Manage your staking pools and view your referral earnings.
          </p>
        </div>
        <Button asChild size="lg" className="button-glow">
          <Link href="/create">
            <PlusCircle className="mr-2 h-5 w-5" />
            Create New Pool
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <main className="lg:col-span-2 space-y-8">
          <Card className="bg-secondary/30 backdrop-blur-sm card-glow">
            <CardHeader>
              <CardTitle>My Staking Pools</CardTitle>
              <CardDescription>A list of all staking pools you have created.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pool Name</TableHead>
                    <TableHead>TVL</TableHead>
                    <TableHead>Stakers</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {createdPools.map((pool) => (
                    <TableRow key={pool.id}>
                      <TableCell className="font-medium text-glow">{pool.name}</TableCell>
                      <TableCell className="font-code">${pool.tvl.toLocaleString()}</TableCell>
                      <TableCell>{pool.stakers}</TableCell>
                      <TableCell>
                        <Badge variant={pool.status === 'Live' ? 'default' : 'secondary'} className={pool.status === 'Live' ? 'bg-accent text-accent-foreground' : ''}>{pool.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button asChild variant="ghost" size="sm">
                          <Link href={`/stake/${pool.id}`}>View</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
        <aside className="space-y-8">
           <Card className="bg-secondary/30 backdrop-blur-sm card-glow">
            <CardHeader>
              <CardTitle>Referral Program</CardTitle>
              <CardDescription>Earn fees from pools created with your referral link.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-muted-foreground">Total Earnings</span>
                  <span className="text-2xl font-bold font-code text-glow flex items-center"><DollarSign className="h-5 w-5 mr-1" />1,234.56</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-muted-foreground">Referred Users</span>
                  <span className="text-2xl font-bold font-code text-glow flex items-center"><Users className="h-5 w-5 mr-1" />23</span>
                </div>
              </div>
              <div className="space-y-2 pt-4">
                <Label htmlFor="referral-link">Your Referral Link</Label>
                <div className="flex items-center gap-2">
                  <Input id="referral-link" value="stakingforge.io/r/your-code" readOnly />
                  <Button variant="outline" size="icon">
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
