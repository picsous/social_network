// @flow

import axios from 'axios';
import type { AxiosPromise } from 'axios';

import type { Club, Student } from '../users/type';
import type { ClubMember, ClubRole } from './type';
import type { Post } from '../post/type';

import * as constants from '../../constants';

export function getClubs(): AxiosPromise<Club[]> {
  return axios.get('/club');
}

export function getClub(id: number): AxiosPromise<Club> {
  return axios.get(`/club/${id}`);
}

export function getMembers(id: number): AxiosPromise<ClubMember[]> {
  return axios.get(`/club/${id}/member`);
}

export function getAdmins(id: number): AxiosPromise<Student[]> {
  return axios.get(`/club/${id}/admins`);
}

export function getPosts(id: number, page: number = 0): AxiosPromise<Post[]> {
  return axios.get(`/club/${id}/post?page=${page}`);
}

export function createClub(form): AxiosPromise<void> {
  const formData = new FormData();
  formData.append('club', JSON.stringify({
    name: form.name,
    creation: form.creation.getTime(),
    adminId: form.president,
    description: form.description,
    website: form.website,
  }));
  formData.append('logo', form.logo);
  return axios.post('/club', formData);
}

export function updateClub(id: number, form): AxiosPromise<void> {
  const formData = new FormData();
  formData.append('club', JSON.stringify({
    name: form.name,
    creation: form.creation.getTime(),
    description: form.description,
    website: form.website,
  }));
  formData.append('logo', form.logo);
  return axios.put(`/club/${id}`, formData);
}

export function deleteClub(id: number): AxiosPromise<void> {
  return axios.delete(`/club/${id}`);
}

export function updateMemberRole(memberId: number, roleId: number): AxiosPromise<void> {
  return axios.put(`/club/member/${memberId}/role/${roleId}`);
}

export function addAdmin(clubid: number, studentid: number): AxiosPromise<void> {
  return axios.put(`/club/${clubid}/admin/${studentid}`);
}

export function removeAdmin(clubid: number, studentid: number): AxiosPromise<void> {
  return axios.delete(`/club/${clubid}/admin/${studentid}`);
}

export function addMember(clubid: number, userid: number): AxiosPromise<void> {
  return axios.put(`/club/${clubid}/member/${userid}`);
}

export function deleteMember(memberId: number): AxiosPromise<void> {
  return axios.delete(`/club/member/${memberId}`);
}

export function getClubRoleName(roleName: string): string {
  switch (roleName) {
    case constants.CLUB_ROLE_PRESIDENT:
      return "Président";
    case constants.CLUB_ROLE_TREASURER:
      return "Trésorier";
    case constants.CLUB_ROLE_MEMBER:
      return "Membre";

    default:
      return roleName;
  }
}

export function getClubRoles(clubid: number): AxiosPromise<ClubRole[]>  {
  return axios.get(`/club/${clubid}/role`);
}

export function addRoleName(clubid: number, name: string): AxiosPromise<void> {
  return axios.post(`/club/${clubid}/role/${name}`);
}

export function deleteClubRole(clubid: number, roleId: number): AxiosPromise<void> {
  return axios.delete(`/club/${clubid}/role/${roleId}`);
}