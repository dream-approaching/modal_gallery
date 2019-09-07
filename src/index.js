import React from "react";
import ReactDOM from "react-dom";
import ReactModal from "react-modal";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./styles.css";

ReactModal.setAppElement("#app");

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      classes: "",
      imgs: []
    };
  }

  componentDidMount() {
    const imgs = document.querySelectorAll("img[type=bodyImg]");
    this.setState({
      imgs: [...imgs].map(item => ({ original: item.src }))
    });
    for (let i = 0; i < imgs.length; i++) {
      imgs[i].onclick = this.handleOpenModal;
    }
  }

  handleOpenModal = () => {
    console.log("122");
    this.setState({ showModal: true });
  };

  handleAfterOpenFunc = () => {
    this.setState({ classes: "Overlay_open" });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, classes: "Overlay_close" });
  };

  render() {
    const { showModal, classes, imgs } = this.state;
    return (
      <div>
        <button onClick={this.handleOpenModal}>Trigger Modal</button>
        <ReactModal
          isOpen={showModal}
          closeTimeoutMS={300}
          className="Modal"
          overlayClassName={`Overlay ${classes}`}
          shouldCloseOnOverlayClick
          onRequestClose={this.handleCloseModal}
          onAfterOpen={this.handleAfterOpenFunc}
        >
          <ImageGallery
            ref={ref => (this.imageGallery = ref)}
            infinite={false}
            onClick={this.handleCloseModal}
            showThumbnails={false}
            showNav={false}
            showFullscreenButton={false}
            showPlayButton={false}
            useBrowserFullscreen={false}
            showIndex
            items={imgs}
          />
        </ReactModal>
      </div>
    );
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);
