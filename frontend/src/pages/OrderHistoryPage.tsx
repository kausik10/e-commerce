
import {useNavigate} from 'react-router-dom'
import {useGetOrderHistoryQuery} from '@/hooks/orderHooks'
import {Helmet} from 'react-helmet-async'
import { ApiError } from "@/type/ApiErros";
import { getError } from "@/utils";
import LoadingBox from "@/components/LoadingBox";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/component/ui/table"
  import { Button } from "@/component/ui/button";
import { Alert } from '@/component/ui/alert';
// import { useToast } from '@/component/ui/use-toast';


export default function OrderHistoryPage () {
 
    const navigate = useNavigate();
    const {data: orders, isLoading, error} = useGetOrderHistoryQuery();
    // const {toast} = useToast();

    
    return (
        <div>
            <Helmet>
                <title>Order History</title>
            </Helmet>
            <h1>Order History</h1>

            {
                isLoading ? (
                    <LoadingBox />
                ) : error ? ( 
                   <Alert>
                        Error: {getError(error as ApiError)}
                    </Alert> 
                // toast({
                //     title: "Error",
                //     variant: "destructive",
                //     description: getError(error as ApiError),
                // })
                   
            ): (

                <Table>
                    <TableCaption>Your recent Order History</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>DATE</TableHead>
                            <TableHead>TOTAL</TableHead>
                            <TableHead>PAID</TableHead>
                            <TableHead>DELIVERED</TableHead>
                            <TableHead className='text-right'>ACTIONS</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders!.map((order) => (
                            <TableRow key={order._id}>
                                <TableCell className='font-medium'>{order._id}</TableCell>
                                <TableCell>{order.createdAt.substring(0,10)}</TableCell>
                                <TableCell>{order.totalPrice.toFixed(2)}</TableCell>
                                <TableCell>{order.isPaid ? order.paidAt.substring(0,10) : "No"}</TableCell>
                                <TableCell>{order.isDelivered ? order.deliveredAt.substring(0,10) : "No"}</TableCell>
                                <TableCell className='text-right'><Button variant="secondary" onClick={()=>navigate(`/order/${order._id}`)}> Details</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                
                
            )
            }
        </div>
    )
  
}


