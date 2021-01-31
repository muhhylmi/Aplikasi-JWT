import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../App";

const api_url = "http://localhost:3001";

function ListMahasiswa() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const { state, dispatch } = useContext(AuthContext);

  const fetchData = () => {
    var config = {
      headers: {
        Content_Type: "application/json",
        Authorization: "Bearer " + state.token,
      },
    };

    axios
      .get(api_url + "/auth/api/v1/admin/mahasiswa", config)
      .then((res) => {
        setMahasiswa(res.data.values);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const timeout = () => {
    setTimeout(() => {
      dispatch({
        type: "LOGOUT",
      });
    }, state.tokenExpires);
  };

  useEffect(() => {
    fetchData();
    //membuat Timeout jika token kadaluarsa
    timeout();
    // eslint-disable-next-line
  }, []);

  if (!state.isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <Container>
      <h2 className="my-2">Daftar Mahasiswa</h2>
      <hr />
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>No</th>
            <th>NIM</th>
            <th>Nama</th>
            <th>Jurusan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {mahasiswa.map((mhs, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{mhs.nim}</td>
                <td>{mhs.nama}</td>
                <td>{mhs.jurusan}</td>
                <td>Ubah | Delete</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}

export default ListMahasiswa;
