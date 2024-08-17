import Image from "next/image";
import { UpdateInvoice, DeleteInvoice } from "@/app/ui/invoices/buttons";
import InvoiceStatus from "@/app/ui/invoices/status";
import { formatDateToLocal, formatCurrency } from "@/app/lib/utils";
import { fetchFilteredInvoices, viewDashboard } from "@/app/lib/data";
export default async function DashboardTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  //   const invoices = await fetchFilteredInvoices(query, currentPage);
  const list_invoice = await viewDashboard();
  console.log(list_invoice);
  const invoices = [
    {
      id: "1",
      client_name: "Sarah",
      series_name: "Harry Potter",
      season_name: "Philosopher stone",
      total_payment_recieved: "200",
      payment_date: "2024-10-22",
    },
  ];

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Client Id
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Client Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  TV Series Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Season Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Total Payment Recieved
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Last Payment Date
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {invoices?.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{invoice.client_name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {invoice.series_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {invoice.season_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {invoice.total_payment_recieved}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(invoice.payment_date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3"></td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateInvoice id={invoice.id} />
                      <DeleteInvoice id={invoice.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
