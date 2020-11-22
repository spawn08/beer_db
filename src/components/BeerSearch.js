import React, { Component } from "react";
import { BEER_CRAFT_API, BEER_IMAGES_API } from "../constants/beer_api_urls";
import axios from "axios";

import { Pagination } from "semantic-ui-react";
import BeerList from "./BeerList";
import AppLoader from "./loader";
import "./beer_search.css";

export default class BeerSearch extends Component {
  state = {
    beer_list: [[]],
    beer_images: [],
    beerDataSize: 0,
    loading: true,
    activePage: 1,
  };

  componentDidMount() {
    this.fetchBeerImages();
  }

  fetchBeerImages = () => {
    axios.get(BEER_IMAGES_API).then((response) => {
      this.setState({ beer_images: response.data });
      this.fetchBeerData();
    });
  };

  fetchBeerData = () => {
    axios.get(BEER_CRAFT_API).then((response) => {
      const { beer_images } = this.state;
      let beer_data_temp = response.data;
      let beerDataSize = beer_data_temp.length;

      let beer_list = [];
      let imageIndex = 0;
      let size = 20;
      for (var i = 0; i < beer_data_temp.length; i++) {
        if (imageIndex > 4) imageIndex = 0;
        beer_data_temp[i].image = beer_images[imageIndex].image;
        imageIndex = imageIndex + 1;
      }
      while (beer_data_temp.length > 0)
        beer_list.push(beer_data_temp.splice(0, size));
      this.setState({
        beer_list: beer_list,
        beerDataSize: beerDataSize,
        loading: false,
      });
    });
  };

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
  };

  render() {
    const { beer_list, loading, activePage, beerDataSize } = this.state;
    if (!loading)
      return (
        <div className="container">
          <BeerList beer_list={beer_list} activePage={activePage} />

          <div className="pagination">
            <Pagination
              defaultActivePage={1}
              firstItem={null}
              lastItem={null}
              pointing
              secondary
              totalPages={Math.round(beerDataSize / 20)}
              onPageChange={this.handlePaginationChange}
            />
          </div>
        </div>
      );
    else return <AppLoader message={"Loading Data..."} />;
  }
}
