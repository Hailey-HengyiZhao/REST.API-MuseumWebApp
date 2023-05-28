import useSWR from "swr";
import Error from "next/error";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Button, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArtworkCardDetail(props) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    setShowAdded(favouritesList?.includes(props.objectID));
  }, [favouritesList]);

  const { data, error } = useSWR(
    props.objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`
      : null,
    fetcher
  );

  if (error) return <Error statusCode={404} />;
  if (!data) return null;

  async function favouritesClicked() {
    if (showAdded) {
      setFavouritesList(await removeFromFavourites(props.objectID));
      setShowAdded(false);
    } else {
      setFavouritesList(await addToFavourites(props.objectID));
      setShowAdded(true);
    }
  }

  return (
    <>
      <Card>
        <Card.Img
          variant="top"
          src={
            data?.primaryImage ||
            "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
          }
        />
        <Card.Body>
          <Card.Title>{data?.title || "N/A"}</Card.Title>
          <Card.Text>
            <strong>Date:</strong> {data?.objectDate || "N/A"} <br />
            <strong>Classification:</strong> {data?.classification || "N/A"}
            <br />
            <strong>Medium:</strong> {data?.medium || "N/A"}
            <br /> <br />
            {/* Artist: Kubo Shunman ( wiki )
            Credit Line: H. O. Havemeyer Collection, Bequest of Mrs. H. O. Havemeyer, 1929
            Dimensions: 5 9/16 x 7 1/4 in. (14.1 x 18.4 cm) */}
            <strong>Artist: </strong> {data?.artistDisplayName || "N/A"}
            {data?.artistDisplayName && (
              <>
                {" "}
                ({" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={data?.artistWikidata_URL}
                >
                  wiki
                </a>{" "}
                )
              </>
            )}
            <br />
            <strong>Credit Line: </strong> {data?.creditLine} <br />
            <strong>Dimensions: </strong>
            {data?.dimensions} <br />
          </Card.Text>
          <Button
            variant={showAdded ? "primary" : "outline-primary"}
            onClick={favouritesClicked}
          >
            {showAdded ? "+ Favourite (added)" : "+ Favourite"}
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}
