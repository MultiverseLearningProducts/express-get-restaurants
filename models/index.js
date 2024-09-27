const Restaurant = require('./Restaurant')
const Item = require('./Item')
const Menu = require('./menu')

//associations
Restaurant.hasMany(Menu)
Menu.belongsTo(Restaurant)

Item.belongsToMany(Menu, 'Item_Menu')
Menu.belongsToMany(Item, 'Item_Menu')


module.exports = Restaurant;