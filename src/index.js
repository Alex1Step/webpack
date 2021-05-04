import Post from "./Post";
import "./styles/styles.css";
import * as $ from "jquery";
// import json from "./assets/json.json";
import WebpackLogo from "./assets/webpack-logo.png";
// import xml from "./assets/data.xml";

const post = new Post("Webpack post title");

$("pre").html(post.toString());

console.log("Post to string: " + post.toString());

console.log("Hello");
