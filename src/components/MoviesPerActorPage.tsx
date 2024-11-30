import React, { useState } from 'react';
import { useMoviePerActor } from '../hooks/useActors';
import { Typography, MenuItem, Select, CircularProgress, List, ListItem } from '@mui/material';
import { PageLayout } from './PageLayout';

export const MoviesPerActorPage = () => {
    const { data, loading, error } = useMoviePerActor();
    const [selectedActor, setSelectedActor] = useState<string | null>(null);

    const handleActorChange = (actorName: string) => {
        setSelectedActor(actorName);
      };

    const renderMovies = () => {
        if (!selectedActor || !data) return null;
        const movies = data[selectedActor];
    
        if (!movies) return <Typography>No movies found for this actor.</Typography>;
    
        return (
          <List>
            {movies.map((movie, index) => (
              <ListItem key={index}>{movie}</ListItem>
            ))}
          </List>
        );
      };
    
      return (
        <PageLayout title="Movies Per Actor">
            {loading && <CircularProgress />}
            {error && <Typography color="error">Error: {error}</Typography>}
            {data && <Select
              value={selectedActor || ''}
              onChange={(e) => handleActorChange(e.target.value)}
              fullWidth
              displayEmpty
              sx={{ marginBottom: 2 }}
            >
              <MenuItem value="" disabled>
                Select an actor
              </MenuItem>
              {Object.keys(data).map((actorName) => (
                  <MenuItem key={actorName} value={actorName}>
                    {actorName}
                  </MenuItem>
                ))}
            </Select>}
            {renderMovies()}
          </PageLayout>
      );
    };