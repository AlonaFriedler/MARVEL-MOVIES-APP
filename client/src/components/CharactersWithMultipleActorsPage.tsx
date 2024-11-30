import React from 'react';
import { useCharactersWithMultipleActors } from '../hooks/useCharacters';
import { Typography, Box, CircularProgress, List, ListItem, ListSubheader } from '@mui/material';
import { PageLayout } from './PageLayout';

export const CharactersWithMultipleActorsPage = () => {
  const { data , loading, error } = useCharactersWithMultipleActors();

  const renderCharacters = () => {
    if (!data) return null;

    return (
      <List>
        {Object.entries(data).map(([characterName, actors]) => (
          <Box key={characterName} sx={{ marginBottom: 2 }}>
            <ListSubheader>{characterName}</ListSubheader>
            <List>
              {actors.map((actor, index) => (
                <ListItem key={index}>
                  <strong>{actor.actorName}</strong>&nbsp;in {actor.movieName}
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </List>
    );
  };

  return (
    <PageLayout title="Characters with Multiple Actors">
        {loading && <CircularProgress />}
        {error && <Typography color="error">Error: {error}</Typography>}
        {renderCharacters()}
      </PageLayout>
  );
};