import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationControlled({ count, page, onChange }) {
  return (
    <Stack spacing={2}>
      {/* <Typography></Typography> */}
      <Pagination count={count} page={page} onChange={onChange} />
    </Stack>
  );
}
