import Video from "../model/Video";

export function videoEntity(object: any) {
  const video = new Video();

  if (object === null || object === undefined) {
    return new Video();
  }
  const {
    snippet: { thumbnails = {} },
    snippet = {}
  } = object;
  video.channelId = snippet.channelId;
  video.channelTitle = snippet.channelTitle;
  video.description = snippet.description;
  video.playlistId = snippet.playlistId;
  video.publishedAt = snippet.publishedAt;
  video.resourceId = snippet.resourceId;
  video.title = snippet.title;
  video.url_imagen = thumbnails.default.url;

  return video;
}

export function videoEntityList(data = []) {
  if (data === null || data === undefined) {
    return [];
  }
  const dataMapper = data.map((obj: any) => {
    const newObject = { ...obj };
    return videoEntity(newObject);
  });
  return dataMapper;
}
