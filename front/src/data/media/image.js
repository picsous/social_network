// @flow

import axios from 'axios';
import type { AxiosPromise } from 'axios';

import type { Image, Gallery, Match } from './type';

export function createImage(file: File): AxiosPromise<Image> {
  var data = new FormData();
  data.append('image', file);
  return axios.post('/media/image', data);
}

export function createGallery(form): AxiosPromise<Gallery> {
  var data = new FormData();
  data.append('name', form.title);
  for (var i = 0; i < form.images.length; i++) {
    data.append('images[]', form.images[i]);
  }
  return axios.post('/media/gallery', data);
}

export function getGallery(id: number): AxiosPromise<Gallery> {
  return axios.get(`/media/gallery/${id}`);
}

export function getGalleryImages(id: number): AxiosPromise<Image[]> {
  return axios.get(`/media/gallery/${id}/images`);
}

export function matchStudent(photoId: number, studId: number): AxiosPromise<void> {
  return axios.put(`/media/image/${photoId}/match/${studId}/tag`);
}

export function unmatchStudent(photoId: number, studId: number): AxiosPromise<void> {
  return axios.put(`/media/image/${photoId}/match/${studId}/untag`);
}

export function getImageTags(id: number): AxiosPromise<Match[]> {
  return axios.get(`/media/image/${id}/tags`);
}

export function deleteImages(galleryId: number, imageids: number[]): AxiosPromise<void> {
  return axios.put(`/media/gallery/${galleryId}/images/remove`, imageids);
}

export function addImages(galleryId: number, images: File[]): AxiosPromise<void> {
  const form = new FormData();
  for (var i = 0; i < images.length; i++) {
    form.append('images[]', images[i]);
  }
  return axios.put(`/media/gallery/${galleryId}/images`, form);
}