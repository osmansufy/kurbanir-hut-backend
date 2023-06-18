"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = exports.Label = exports.Breed = exports.Location = void 0;
// Enum for location
var Location;
(function (Location) {
    Location["Dhaka"] = "Dhaka";
    Location["Chattogram"] = "Chattogram";
    Location["Barishal"] = "Barishal";
    Location["Rajshahi"] = "Rajshahi";
    Location["Sylhet"] = "Sylhet";
    Location["Comilla"] = "Comilla";
    Location["Rangpur"] = "Rangpur";
    Location["Mymensingh"] = "Mymensingh";
})(Location || (exports.Location = Location = {}));
// Enum for breed
var Breed;
(function (Breed) {
    Breed["Brahman"] = "Brahman";
    Breed["Nellore"] = "Nellore";
    Breed["Sahiwal"] = "Sahiwal";
    Breed["Gir"] = "Gir";
    Breed["Indigenous"] = "Indigenous";
    Breed["Tharparkar"] = "Tharparkar";
    Breed["Kankrej"] = "Kankrej";
})(Breed || (exports.Breed = Breed = {}));
// Enum for label
var Label;
(function (Label) {
    Label["ForSale"] = "for sale";
    Label["SoldOut"] = "sold out";
})(Label || (exports.Label = Label = {}));
// Enum for category
var Category;
(function (Category) {
    Category["Dairy"] = "Dairy";
    Category["Beef"] = "Beef";
    Category["DualPurpose"] = "Dual Purpose";
})(Category || (exports.Category = Category = {}));
