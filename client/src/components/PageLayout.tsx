import React, { ReactNode } from 'react';
import { Container, Box, Typography } from '@mui/material';

interface PageLayoutProps {
  title: string;
  children: ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ title, children }) => {
  return (
    <Container maxWidth="md">
    <Box sx={{ padding: 2, boxShadow: 3, borderRadius: 2, bgcolor: 'white', marginTop: 5 }}>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Box>
          {children}
        </Box>
      </Box>
    </Container>
  );
};

