"use client";

import { CircularProgress } from "@mui/material";
import CustomTable, {
  CustomTableProps,
} from "@components/admin/ui/CustomTable";
import PageHeader, {
  PageHeaderProps,
} from "@components/admin/layout/PageHeader";

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
    <section className="min-h-[calc(100vh-163px)] table-section text-primary-900 bg-primary-100 px-4 py-6">
      {HeaderOptions && <PageHeader {...HeaderOptions} />}

      <div className="w-full mt-6">
        {TableOptions ? (
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
