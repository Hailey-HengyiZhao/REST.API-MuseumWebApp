import ArtworkCardDetail from "@/components/ArtworkCardDetail";
import { useRouter } from "next/router";
import { Col, Row } from "react-bootstrap";
import Error from "next/error";

export default function ArtworkById() {
  const router = useRouter();
  const { objectID } = router.query;
  return (
    <>
      {/* <p> objectID: {objectID}</p> */}

      <Row>
        <Col>
          <ArtworkCardDetail objectID={objectID} />
        </Col>
      </Row>
    </>
  );
}
