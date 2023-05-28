import useSWR from "swr";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Card, Col, Row } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";
import Pagination from "react-bootstrap/Pagination";
import Error from "next/error";
import validObjectIDList from "@/public/data/validObjectIDList.json";

const PER_PAGE = 12;
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Artwork() {
  const [artworkList, setArtworkList] = useState();
  const [page, setPage] = useState(1);
  const router = useRouter();
  let finalQuery = router.asPath.split("?")[1];

  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`,
    fetcher
  );

  function previousPage() {
    if (page > 1) setPage((page) => page - 1);
  }

  function nextPage() {
    if (page < artworkList.length) setPage((page) => page + 1);
  }

  useEffect(() => {
    // console.log("Now is in the useEffect");
    if (data) {
      let filteredResults = validObjectIDList.objectIDs.filter((x) =>
        data.objectIDs?.includes(x)
      );

      if (filteredResults.length < 1) {
        router.push(404)
      } else {
        let results = [];
        for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
          const chunk = filteredResults.slice(i, i + PER_PAGE);
          results.push(chunk);
        }
        setArtworkList(results);
        setPage(1);
      }
    }
    // console.log("filteredResults is: " + filteredResults);
  }, [data]);

  if (error) return <Error statusCode={404} />;
  if (!artworkList) return null;

  return (
    <>
      <Row className="gy-4">
        {artworkList.length > 0 ? (
          artworkList[page - 1].map((currentObjectID) => (
            <Col lg={3} key={currentObjectID}>
              <ArtworkCard objectID={currentObjectID} />
              {/* <p>Artwork {currentObjectID}</p> */}
            </Col>
          ))
        ) : (
          <Card>
            <Card.Body>
              <Card.Title>
                <h4>Nothing Here</h4>
              </Card.Title>
              <Card.Text>Try searching for something else.</Card.Text>
            </Card.Body>
          </Card>
        )}
      </Row>
      {artworkList.length > 0 && (
        <Row>
          <Col>
            <Pagination>
              <Pagination.Prev onClick={previousPage} />
              <Pagination.Item active>{page}</Pagination.Item>
              <Pagination.Next onClick={nextPage} />
            </Pagination>
          </Col>
        </Row>
      )}
    </>
  );
}
