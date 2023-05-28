import useSWR from "swr";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Link from "next/link";
import Error from "next/error";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArtworkCard(props) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`,
    fetcher
  );
  if (error) return <Error statusCode={404} />;
  if (!data) return null;
  // console.log(props);

  let url = `/artwork/${data?.objectID}`;
  return (
    <>
      <Card>
        <Card.Img
          variant="top"
          src={
            data?.primaryImageSmall ||
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
            <br />
          </Card.Text>
          <Link href={url} passHref>
            <Button variant="primary">
              <strong>ID: </strong>
              {data?.objectID}
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}
