import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Col, Row } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";
import Card from "react-bootstrap/Card";

export default function Favourites() {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  if (!favouritesList) {
    return null;
  }
  return (
    <>
      <Row className="gy-4">
        {favouritesList.length > 0 ? (
          favouritesList.map((ObjectID) => (
            <Col lg={3} key={ObjectID}>
              <ArtworkCard objectID={ObjectID} />
            </Col>
          ))
        ) : (
          <Card>
            <Card.Body>
              <Card.Title>
                <h4>Nothing Here</h4>
              </Card.Title>
              <Card.Text>Try adding some new artwork to the list.</Card.Text>
            </Card.Body>
          </Card>
        )}
      </Row>
    </>
  );
}
