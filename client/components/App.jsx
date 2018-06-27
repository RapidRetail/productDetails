import React from 'react';
import axios from 'axios';
import Sticky from 'react-stickynode';
import Colors from './Colors';
import Sizes from './Sizes';
import ItemMaterial from './ItemMaterial';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      share: false,
    };
  }

  componentDidMount() {
    let id = window.location.pathname.slice(1);
    if (!id) {
      id = 1;
    }
    this.getProductDetails(id);
  }

  getProductDetails(id) {
    axios.get(`/productDetails/${id}`)
      .then((response) => {
        console.log('ur response is:', response);
        this.setState({
          products: [...response.data],
        });
      })
      .catch((error) => {
        console.log('your get has an error', error);
      });
  }

  toggleShare() {
    this.setState({
      share: !this.state.share,
    });
  }

  render() {
    console.log(this.state.products);
    return (
      <div className="product-details">
        {
            this.state.products.map(product => (
              <Sticky enabled top={0} bottomBoundary={4655.9549560546875}>
                <div className="product-details-container" key={product}>
                  <h1 className="title">{product.title}</h1>
                  <span className="price">{product.price} <span style={{ fontSize: '9pt' }}>USD</span></span>
                  <div className="description-title">Why we made this</div>
                  <p className="description">{product.description}</p>

                  <div>
                    <Colors colors={product.color} />
                  </div>

                  <br />

                  <div>
                    <Sizes sizes={product.size} />
                  </div>

                  <div>
                    <button className="button" id="bag">ADD TO BAG</button>
                    <button className="button" id="store">FIND IN STORE</button>
                  </div>

                  <div className="share-live-chat-review-div">
                    <div className="inner">
                      <button className="share-live-chat-review-button" onClick={() => this.toggleShare()}><img className="icons" alt="" src="https://www.dropbox.com/s/gs517cfxgfftiql/shareicon.svg?raw=1" /><div>Share</div></button>
                      {
                      this.state.share &&
                      <div>
                        <div style={{ letterSpacing: '6px' }}>
                          <i className="fab fa-facebook-f fa-sm" />
                          <i className="fab fa-twitter fa-sm" />
                          <i className="fab fa-pinterest-p fa-sm" />
                          <i className="fab fa-tumblr fa-sm" />
                          <i className="fab fa-google-plus-g fa-sm" />
                          <i className="far fa-envelope fa-sm" />
                        </div>
                      </div>
                    }
                    </div>

                    <div className="vertical-line" />
                    <div className="inner">
                      <button className="share-live-chat-review-button"><img alt="" className="icons" src="https://www.dropbox.com/s/ridlic1h8p5vn8h/chaticon.svg?raw=1" /><div>Live Chat</div></button>
                    </div>

                    <div className="vertical-line" />
                    <div className="inner">
                      <button className="share-live-chat-review-button"><img className="icons" src="https://www.dropbox.com/s/u4ehp6c2f211sak/staricon.svg?raw=1" alt="" /><div>Reviews</div></button>
                    </div>


                  </div>

                  <div>
                    <ItemMaterial
                      fabric={product.fabric}
                      care={product.care}
                      features={product.features}
                    />
                    <br />
                    <span className="sku">SKU: {product._id}</span>
                  </div>
                </div>
              </Sticky>
            ))
         }
      </div>
    );
  }
}

export default App;
