function Header(props) {
    return (
        <header className="masthead bg-primary text-white text-center">
            <div className="container d-flex align-items-center flex-column">
            <h2 className="page-section-heading text-center text-uppercase text-white">Want an idea?</h2>
            <div className="divider-custom divider-light">
                <div className="divider-custom-line"></div>
                <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
                <div className="divider-custom-line"></div>
            </div>
            <p className="masthead-subheading font-weight-light mb-0">You decided to cook at home and have no idea what to do? No problem, click the button and start get the suggestions.</p>
            { props.isGetButtonClicked && <div className="text-center mt-4">
                <a className="btn btn-xl btn-outline-light" href="#" onClick={props.onBringButtonClick}>
                    <i className="fas fa-cookie-bite me-2"></i>
                    Bring
                </a>
            </div> }
            </div>
        </header>
    ); 
};

export default Header;