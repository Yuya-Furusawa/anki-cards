const path = require('path');

module.exports = {
  images: {
    domains: ['res.cloudinary.com'],
    sassOptions: {
      includePaths: [path.join(__dirname, 'src', 'styles')],
    }
  }
}