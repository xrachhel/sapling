import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CardColumns from "react-bootstrap/CardColumns";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import "../components/ourNavbar/assets/css/style.css";
import { useStoreContext } from "../utils/GlobalState";
import {
  SET_DASHBOARD_LIST,
  SET_CURRENT_PRODUCT,
  LOADING,
  SET_AMAZON_PRODUCT,
  SET_BESTBUY_PRODUCT,
  REMOVE_PRODUCT
} from "../utils/actions";
import API from "../utils/API";
import { Line } from "react-chartjs-2";

import "./assets/dashboard.css";

let userId = localStorage.getItem("userID");

const Dashboard = () => {
  const [state, dispatch] = useStoreContext();
  const [show, setShow] = useState(false);

  useEffect(() => {
    getTrackedItems();
  }, []);

  console.log("tracked list", state.trackedList);

  const [lineData, setLineData] = useState({
    datasets: [
      {
        label: "Walmart",
        data: []
      },
      {
        label: "Amazon",
        data: []
      },
      {
        label: "Best Buy",
        data: []
      }
    ],
    fill: false,
    backgroundColor: [
      "rgba(255, 99, 132, 0.6)",
      "rgba(54, 162, 235, 0.6)",
      "rgba(255, 206, 86, 0.6)",
      "rgba(75, 192, 192, 0.6)"
    ],
    borderWidth: 3
  });

  const [lineOptions, setLineOptions] = useState({
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: "Price ($)"
            }
          }
        ]
      },
      title: {
        display: true,
        text: "Price trends",
        fontSize: 25
      },
      legend: {
        display: true,
        position: "top"
      }
    }
  });

  const handleClose = () => setShow(false);

  const getModal = value => {
    setShow(value);
    getInfo(value);
  };

  const getTrackedItems = () => {
    API.getOneUser(userId)
      .then(res => {
        console.log(res.data.trackedProducts);
        dispatch({
          type: SET_DASHBOARD_LIST,
          trackedList: res.data.trackedProducts
        });
      })
      .catch(err => console.log(err));
  };

  const getInfo = value => {
    API.getProductInfoWalmart(state.trackedList[value].itemId).then(res => {
      API.updateWalmarPrice(state.trackedList[value]._id, res.data.salePrice)
        .then(result => {
          console.log("*****Get WalMart");
          console.log(result.data.recentPrices);
          dispatch({ type: LOADING });
          dispatch({
            type: SET_CURRENT_PRODUCT,
            product: {
              name: res.data.name,
              image: res.data.thumbnailImage,
              description: res.data.shortDescription,
              price: res.data.salePrice,
              upc: res.data.upc,
              itemId: res.data.itemId,
              link: res.data.productUrl,
              recentPrices: result.data.recentPrices
            }
          });
        })
        .then(bestbuy => {
          API.getProductInfoBestbuy(state.trackedList[value].upc).then(res => {
            API.updateBestbuyPrice(
              state.trackedList[value]._id,
              res.data.products.salePrice
            ).then(resultbestbuy => {
              console.log("*****Get BestBuy");
              console.log(resultbestbuy);
              if (res.data.products) {
                dispatch({ type: LOADING });
                dispatch({
                  type: SET_BESTBUY_PRODUCT,
                  product: {
                    name: res.data.products.name,
                    link: res.data.products.url,
                    price: res.data.products.salePrice
                  }
                });
              }
            });
          });
        })
        .then(amazon => {
          API.getProductInfoAmazon(state.trackedList[value].upc).then(res => {
            let amazonPrice = 0;
            if(res.data.product){
              if(res.data.product.buybox_winner){
                amazonPrice = res.data.product.buybox_winner.price.value;
              }
            }

            API.updateAmazonPrice(
              state.trackedList[value]._id,
              amazonPrice
            ).then(resultamazon => {
              console.log("*****get Amazon");
              console.log(resultamazon);
              if (res.data.product) {
                dispatch({ type: LOADING });
                dispatch({
                  type: SET_AMAZON_PRODUCT,
                  product: {
                    name: res.data.product.title,
                    link: res.data.product.link,
                    price: amazonPrice
                  }
                });
              }

              setLineData({
                ...lineData,
                datasets: [
                  {
                    label: "Walmart",
                    data: resultamazon.data.recentPrices,
                    borderColor: "rgba(108,171,231)",
                    fill: false
                  },
                  {
                    label: "Best Buy",
                    data: resultamazon.data.recentBestbuyPrices,
                    borderColor: "rgba(10,74,191)",
                    fill: false
                  },
                  {
                    label: "Amazon",
                    data: resultamazon.data.recentAmazonPrices,
                    borderColor: "rgba(255,153,0)",
                    fill: false
                  }
                ]
              });
            });
          });
        });
    });
  };

  const stopTracking = itemId => {
    API.getProductId(itemId).then(res => {
      console.log("stop dashboard tracking", res.data);
      API.deleteProduct(userId, res.data._id).then(res => {
        dispatch({
          type: REMOVE_PRODUCT,
          itemId: itemId
        });
      });
    });
  };

  return (
    <div>
      <Container>
        <h1 className="text-center">Your Tracked Products:</h1>
        <Col className="md-4">
          {!state.trackedList.length ? (
            <h1>No products to display</h1>
          ) : (
            <Container id="background">
              <CardColumns>
                {state.trackedList.map((product, index) => (
                  <div>
                    <Card className="text-center" id="result-card" key={product.name}>
                      <Card.Img
                        variant="top"
                        src={product.image}
                        style={{ width: "70%" }}
                        className="ml-5 pl-5 pt-5"
                      />
                      <Card.Body className="text-center">
                        <Card.Title>{product.name}</Card.Title>
                        <Button
                          variant="dark"
                          onClick={() => getModal(index)}
                        >
                          See Product Info
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => stopTracking(product.itemId)}
                          className="mt-2 mt-lg-0 ml-lg-2"
                        >
                          Stop Tracking
                        </Button>
                      </Card.Body>
                    </Card>
                    <Modal size="lg" show={show === index} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>{product.name}</Modal.Title>
                      </Modal.Header>
                      <div className="lineGraph">
                        <Line data={lineData} options={lineOptions.options} />
                      </div>

                      <h4 className="ml-3 mt-2">Walmart:</h4>

                      <Row>
                        <Col>
                          <Modal.Body>
                            Walmart price before: ${product.price}
                          </Modal.Body>
                        </Col>
                        <Col>
                          <Modal.Body>
                            Walmart price now: ${state.currentProduct.price}
                          </Modal.Body>
                        </Col>
                        <Col>
                          <Modal.Body>
                            <a target="_blank" href={state.currentProduct.link}>
                              {" "}
                              Go to Walmart's website
                            </a>
                          </Modal.Body>
                        </Col>
                      </Row>

                      {product.amazonPrice !== null ? (
                        <div>
                          <h4 className="ml-3">Amazon:</h4>
                          <Row>
                            <Col>
                              <Modal.Body>
                                  Amazon price before: ${product.amazonPrice}
                              </Modal.Body>
                            </Col>
                            <Col>
                              <Modal.Body>
                                  Amazon price now: ${state.amazonProduct.price}
                              </Modal.Body>
                            </Col>
                            <Col>
                              <Modal.Body>
                                  <a target="_blank"href={state.amazonProduct.link}>
                                      Go to Amazon's website
                                      </a>
                              </Modal.Body>
                            </Col>
                          </Row>
                        </div>
                      ) : (
                        <div></div>
                      )}

                      {product.bestbuyPrice !== null ? (
                        <div>
                          <h4 className="ml-3">BestBuy:</h4>
                            <Row>
                              <Col>
                                <Modal.Body>
                                    Best Buy price before: ${product.bestbuyPrice}
                                </Modal.Body>
                              </Col>
                              <Col>
                                <Modal.Body>
                                    Best Buy price now: ${state.bestbuyProduct.price}
                                </Modal.Body>
                              </Col>
                              <Col>
                                <Modal.Body>
                                <a target="_blank"href={state.bestbuyProduct.link}>Go to Best Buy website</a>
                                </Modal.Body>
                              </Col>
                            </Row>
                        </div>
                      ) : (
                        <div></div>
                      )}

                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                ))}
              </CardColumns>
            </Container>
          )}
        </Col>
      </Container>
    </div>
  );
};

export default Dashboard;
