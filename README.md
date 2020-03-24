# Sharp Personal Image Processor

```
yarn

yarn start
```

## Reference

```
/* Resize */
image.contain( w, h[, alignBits || mode, mode] ); // scale the image to the given width and height, some parts of the image may be letter boxed
image.cover( w, h[, alignBits || mode, mode] ); // scale the image to the given width and height, some parts of the image may be clipped
image.resize( w, h[, mode] ); // resize the image. Jimp.AUTO can be passed as one of the values.
image.scale( f[, mode] ); // scale the image by the factor f
image.scaleToFit( w, h[, mode] ); // scale the image to the largest size that fits inside the given width and height

```

### Issues

Need to refactor and make dynamic functions.

Fix sharpness drop in output files.
