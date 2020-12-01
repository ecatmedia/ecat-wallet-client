import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Pagination, Container, Message, Grid } from 'semantic-ui-react';
import ErrorBoundary from '../../common/ErrorBoundary/ErrorBoundary';
import FileCard from './FileCard';
import PageWrapper from '../PageSections/PageWrapper';
import axios from 'axios';
import urls from '../../config/urls';

const Profile = () => {
  const [files, setFiles] = useState([]);
  const [filesLoading, setFilesLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const filePerPage = 10;

  const columnProps = {
    largeScreen: 4,
    computer: 5,
    tablet: 8,
    mobile: 16,
  };

  useEffect(() => {
    async function fetchFiles() {
      await axios({
        url: urls.files.list(),
        method: 'GET',
        withCredentials: true,
      })
        .then(res => {
          setFiles(res.data);
        })
        .catch(err => {
          console.log(err);
        });
      setFilesLoading(false);
    }
    fetchFiles();
  }, [setFiles, setFilesLoading]);

  if (!filesLoading && !files.length) {
    return (
      <ErrorBoundary componentName="Profile">
        <ProfileStyled>
          <PageWrapper>
            <Message visible>
              <Message.Header>Welcome!</Message.Header>
              <p>You have no files uploaded/submitted to ecat.media, yet!</p>
            </Message>
          </PageWrapper>
        </ProfileStyled>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary componentName="Profile">
      <ProfileStyled>
        <PageWrapper>
          <Grid padded="vertiacally">
            <Grid.Row>
              {filesLoading ? (
                <>
                  <Grid.Column {...columnProps}>
                    <FileCard loading={true} />
                  </Grid.Column>
                  <Grid.Column {...columnProps}>
                    <FileCard loading={true} />
                  </Grid.Column>
                </>
              ) : null}
              {files.slice((activePage - 1) * filePerPage, activePage * filePerPage).map(file => {
                return (
                  <Grid.Column {...columnProps}>
                    <FileCard file={file} />
                  </Grid.Column>
                );
              })}
            </Grid.Row>
          </Grid>

          <Container textAlign="center" style={{ marginTop: '20px' }}>
            {filesLoading ? null : (
              <Pagination
                defaultActivePage={activePage}
                totalPages={Math.ceil(files.length / filePerPage)}
                onPageChange={(e, d) => setActivePage(d.activePage)}
              />
            )}
          </Container>
        </PageWrapper>
      </ProfileStyled>
    </ErrorBoundary>
  );
};

const ProfileStyled = styled.div`
  .Profile {
  }
`;

export default Profile;
