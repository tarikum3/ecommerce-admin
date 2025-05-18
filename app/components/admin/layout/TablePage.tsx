"use client";

//import { CircularProgress } from "@mui/material";
import { CustomTableProps } from "@components/admin/ui/CustomTable";
import { PageHeaderProps } from "@components/admin/layout/PageHeader";
import dynamic from "next/dynamic";
import { CustomersOverMonthsSkeleton } from "@components/admin/ui/Skeletons";

const CustomTable = dynamic(() => import("@components/admin/ui/CustomTable"), {
  loading: () => <CustomersOverMonthsSkeleton />,
  ssr: false,
});
const PageHeader = dynamic(
  () => import("@components/admin/layout/PageHeader"),
  {
    loading: () => <CustomersOverMonthsSkeleton />,
    ssr: false,
  }
);
const CircularProgress = dynamic(
  () => import("@mui/material").then((comp) => comp.CircularProgress),
  {
    loading: () => (
      <div className="flex justify-center items-center">loading</div>
    ),
    ssr: false,
  }
);
export interface TablePageProps {
  TableOptions?: CustomTableProps;
  HeaderOptions?: PageHeaderProps;
  isLoading?: boolean;
}

const TablePage: React.FC<TablePageProps> = ({
  TableOptions,
  HeaderOptions,
  isLoading,
}) => {
  return (
    <section className="min-h-[calc(100vh-163px)] table-section text-primary-900 px-4 py-6">
      {HeaderOptions && <PageHeader {...HeaderOptions} />}

      <div className="w-full mt-6">
        {TableOptions && !isLoading ? (
          <CustomTable {...TableOptions} />
        ) : (
          <div className="flex justify-center items-center h-[200px]">
            <CircularProgress />
          </div>
        )}
      </div>
    </section>
  );
};

export default TablePage;
