import './tables.css';
import * as React from 'react';
import md5 from 'md5';
import { createApiClient } from '../../api/api';
import Button from '@mui/material/Button';
import { useTreatmentsContext } from '../../context/treatments';
import { DataGrid, GridApi, GridCellValue, GridColDef } from '@mui/x-data-grid';
import Swal from 'sweetalert2';

const api = createApiClient();

export default function DataGridDemo() {
  const [pageSize, setPageSize] = React.useState<number>(5);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'info',
      headerName: 'Information',
      width: 200,
      editable: true,
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 200,
      editable: false,
    },
    {
      field: 'worker_email',
      headerName: 'Worker Email',
      width: 200,
      editable: true,
    },
    {
      field: 'car_id',
      headerName: 'Car ID',
      width: 200,
      editable: true,
    },
    {
      field: '#',
      headerName: 'Action',
      width: 250,
      sortable: false,
      filterable: false,
      hideable: false,
      renderCell: (params) => {
        const onDelete = (e: { stopPropagation: () => void }) => {
          e.stopPropagation(); // don't select this row after clicking

          const apiData: GridApi = params.api;
          const thisRow: Record<string, GridCellValue> = {};

          apiData
            .getAllColumns()
            .filter((c: any) => c.field !== '__check__' && !!c)
            .forEach(
              (c: any) =>
                (thisRow[c.field] = params.getValue(params.id, c.field))
            );

          api
            .deleteTreatment(
              String(thisRow['id']),
              String(localStorage.getItem('email')),
              md5(String(localStorage.getItem('password')))
            )
            .then(() => {
              console.log('delete: Data loaded successfully ');
              window.location.reload();
            });
        };
        const onSave = (e: { stopPropagation: () => void }) => {
          e.stopPropagation(); // don't select this row after clicking

          const apiData: GridApi = params.api;
          const thisRow: Record<string, GridCellValue> = {};

          apiData
            .getAllColumns()
            .filter((c: any) => c.field !== '__check__' && !!c)
            .forEach(
              (c: any) =>
                (thisRow[c.field] = params.getValue(params.id, c.field))
            );
          const { id, info, worker_email, car_id } = thisRow;
          api
            .updateTreatment(
              String(id),
              String(info),
              String(car_id),
              String(worker_email),
              String(localStorage.getItem('email')),
              md5(String(localStorage.getItem('password')))
            )
            .then(() => {
              Swal.fire({
                title: 'Success!',
                text: 'Updated query successfully',
                icon: 'success',
                confirmButtonText: 'OK',
              });

              window.location.reload();
            })
            .catch(() => {
              Swal.fire({
                title: 'Error!',
                text: 'Something went wrong!',
                icon: 'error',
                confirmButtonText: 'OK',
              });
            });
        };
        return (
          <div>
            <Button onClick={onSave}>Save</Button>
            <Button onClick={onDelete}>Delete</Button>
          </div>
        );
      },
    },
  ];
  const { treatments, setTreatments } = useTreatmentsContext();

  React.useEffect(() => {
    async function fetchTreatments() {
      const data: any = await api.getTreatments(
        String(localStorage.getItem('email')),
        md5(String(localStorage.getItem('password')))
      );
      console.log('refresh: Data loaded successfully ');
      console.log(data);
      setTreatments(data);
    }
    fetchTreatments();
  }, [setTreatments]);

  return (
    <>
      <h2>Treatments</h2>
      <DataGrid
        className='loading-medium'
        rows={treatments}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        getRowId={(row: any) => (row.id ? row.id : Math.random())}
      />
    </>
  );
}
