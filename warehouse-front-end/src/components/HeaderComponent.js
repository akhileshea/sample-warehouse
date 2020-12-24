import React, {Component} from 'react';
import { NavbarBrand, NavItem} from 'reactstrap';
import Drawer from '@material-ui/core/Drawer';
import {connect} from 'react-redux';
import warehouseLogo from '../warehouseLogo.svg';
import {uploadInventoryData,uploadProductData} from '../redux/ActionCreators';
import CircularProgress from '@material-ui/core/CircularProgress';


const mapStateToProps = state => {
    return {
        productUpload:state.productUpload,
        inventoryUpload:state.inventoryUpload
    }
  }

const mapDispachToProps = (dispatch) => ({
    uploadProductData: (file) =>{dispatch(uploadProductData(file))},
    uploadInventoryData: (file) =>{dispatch(uploadInventoryData(file))},
})

class Header extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isUploadSectionOpen:false,
            anchorEl:null,
        };
        this.productUploadRef= React.createRef();
        this.inventoryUploadRef= React.createRef();
    }
    
    handleClick = (event) => {
        this.setState({anchorEl : event.currentTarget,isUploadSectionOpen:!this.state.isUploadSectionOpen});
    };
    
    onUploadProductDataClick = (event) => {
        this.productUploadRef.current.click();        
    };

    onUploadInventoryClick = (event) => {
        this.inventoryUploadRef.current.click();        
    };

    handleUploadProductDataClick = (event) => {
        this.props.uploadProductData(event.target.files[0]);
        event.target.value = null;
    };
    
    handleUploadInventoryDataClick = (event) => {
        this.props.uploadInventoryData(event.target.files[0]);
        event.target.value = null;
    };
    
    uploadSection = () => {
        if(this.props.productUpload.isLoading || this.props.inventoryUpload.isLoading) {
            return(
                <CircularProgress/>
            )
        }
        else {
            return(
                <div className="upload-section"> 
                    <div><img className="close-button" src="assets/images/close.svg" alt="close" onClick={()=>{this.setState({isUploadSectionOpen:false});}}/></div>
                        <div className="upload-content">
                            <div className="upload-container" >
                                    <div className="upload-heading">Upload</div>
                                        <div className="upload-items-holder">
                                            <div className="upload-item">
                                                <span className="upload-btn-text">Products data</span>
                                                <img className="upload-sharearrow" src="assets/images/sharearrow.svg" alt="upload product data" title='Upload new version' onClick={this.onUploadProductDataClick}/>
                                                <input type="file" id="productFile" ref={this.productUploadRef} accept=".json" onChange={this.handleUploadProductDataClick}  style={{display: "none"}}/>
                                            </div>
                                            <div className="upload-item">
                                                <span className="upload-btn-text">Inventory data</span>
                                                <img className="upload-sharearrow" src="assets/images/sharearrow.svg" title='Upload new version' onClick={this.onUploadInventoryClick} alt="upload inventory data"/>
                                                <input type="file" id="inventoryFile" ref={this.inventoryUploadRef} accept=".json" onChange={this.handleUploadInventoryDataClick} style={{display: "none"}}/>
                                            </div>
                                        </div> 
                                    </div>
                            </div>   
                </div>
            )
        }
    }
    render() {
        
        return(
            <>
                <nav className="navbar navbar-expand-md">
                    <NavbarBrand className="mr-auto" href="/">
                        <img src={warehouseLogo} height="100" width="200" alt="Logo"/>
                    </NavbarBrand>
                            <NavItem className="upload" onClick={this.handleClick}>
                                <span className="upload-text">Manage Inventory</span>
                                <img className="drop-down-chevron" src="assets/images/chevronDown.svg" alt="chevron"/>
                            </NavItem>
                            
                            <Drawer anchor="right" id="upload" open={this.state.isUploadSectionOpen} >
                                    {this.uploadSection()}
                            </Drawer>
                </nav>
            </>
        );
    }
}

export default connect(mapStateToProps,mapDispachToProps)(Header);