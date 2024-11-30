import React from 'react';
import { useActorsWithMultipleCharacters } from '../hooks/useActors';
import { Typography, Box, CircularProgress, List, ListItem, ListSubheader } from '@mui/material';
import { PageLayout } from './PageLayout';

export const ActorsWithMultipleCharactersPage = () => {
  const { data, loading, error } = useActorsWithMultipleCharacters();

  const renderActors = () => {
    if (!data) return null;

    return (
      <List>
        {Object.entries(data).map(([actorName, characters]) => (
          <Box key={actorName} sx={{ marginBottom: 2 }}>
            <ListSubheader>{actorName}</ListSubheader>
            <List>
              {characters.map((character, index) => (
                <ListItem key={index}>
                  <strong>{character.characterName}</strong>&nbsp;in {character.movieName}
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </List>
    );
  };

  return (
    <PageLayout title='Actors with Multiple Characters'>
        {loading && <CircularProgress />}
        {error && <Typography color="error">Error: {error}</Typography>}

        {renderActors()}
     </PageLayout>
  );
};