import React, { useState, useEffect } from "react";
import { Menu, Button, Avatar, Typography } from "antd";
import { Link } from "react-router-dom";
import image from "../images/cryptocurrency.png";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  MenuOutlined,
  FundOutlined,
} from "@ant-design/icons/lib/icons";

const Navbar = () => {
  const [ActiveMenu, setActiveMenu] = useState(true);
  const [screenSize, setscreenSize] = useState(null);
  useEffect(() => {
    const handleResize = ()=>setscreenSize(window.innerWidth);
    window.addEventListener('resize' , handleResize());
    handleResize();
    return window.removeEventListener('resize' , handleResize())
  }, [])

  useEffect(() => {
    if(screenSize > 768){
      setActiveMenu(true);
      console.log(ActiveMenu);
    }
    else{
      setActiveMenu(false)
    }
  }, [screenSize])
  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={image} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">CryptoApp</Link>
        </Typography.Title>
        <Button className="menu-control-container" onClick= {() => setActiveMenu(!ActiveMenu)}>
          <MenuOutlined/>
        </Button>
      </div>
      {ActiveMenu &&( <Menu theme="dark">
        <Menu.Item icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item icon={<FundOutlined />}>
          <Link to="/cryptocoins">CryptoCurrencies</Link>
        </Menu.Item>
        <Menu.Item icon={<MoneyCollectOutlined />}>
          <Link to="/exchanges">Exchanges</Link>
        </Menu.Item>
        <Menu.Item icon={<BulbOutlined />}>
          <Link to="/news">News</Link>
        </Menu.Item>
      </Menu>)}
     
    </div>
  );
};

export default Navbar;
