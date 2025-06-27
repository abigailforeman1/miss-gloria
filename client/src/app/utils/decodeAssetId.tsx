type DecodedAsset = {
  assetId: string;
  dimensions: {
    width: number;
    height: number;
  };
  format: string;
};

export default function decodeAssetId(
  id: string
): DecodedAsset {
  const pattern = /^image-([a-f\d]+)-(\d+x\d+)-(\w+)$/;

  const [, assetId, dimensions, format] = pattern.exec(id);
  const [width, height] = dimensions
    .split("x")
    .map((v: string) => parseInt(v, 10));

  return {
    assetId,
    dimensions: { width, height },
    format,
  };
}
