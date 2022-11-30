import {
  Avatar,
  Heading,
  Stack,
  Button,
  Text,
  useColorModeValue,
  Center,
  Box,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  FormControl,
  InputGroup,
  Select,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import backend from "../../api/backend";
import Navbar from "../../components/navbar";
import { AuthContext } from "../../utils/AuthContext";
import axios from "axios";

const Detail = () => {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [matakuliahList, setMatakuliahList] = useState([]);
  const [user, setUser] = useState(null);
  const [matakuliahId, setMatakuliahId] = useState("");
  const { token, setToken } = useContext(AuthContext);
  const router = useRouter();

  const getMahasiswa = async (nim) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/mahasiswa/${router.query.id}`
      );
      console.log(res.data.data);
      setMahasiswa(res.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getMataKuliahList = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/matakuliah`);
      console.log(res.data.data);
      setMatakuliahList(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // const getUserByToken = async () => {
  //   try {
  //     const res = await backend.get("/mahasiswa/profile", {
  //       headers: {
  //         token,
  //         validateStatus: false,
  //       },
  //     });

  //     if (res.status !== 200) {
  //       alert(res.data.message);
  //       return;
  //     }

  //     return setUser(res.data.mahasiswa);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const addMataKuliah = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:5000/mahasiswa/${mahasiswa.nim}/matakuliah/${matakuliahId}`,
        {},
        {
          headers: {
            token,
            validateStatus: false,
          },
        }
      );

      if (res.status !== 200) {
        alert(res.data.message);
        return;
      }

      alert(res.data.message);
      getMahasiswa(router.query.id);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMataKuliah = async (matakuliahId, nim) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/mahasiswa/${nim}/matakuliah/${matakuliahId}`,
        {},
        {
          headers: {
            token,
            validateStatus: false,
          },
        }
      );

      if (res.status !== 200) {
        alert(res.data.message);
        return;
      }

      alert(res.data.message);
      getMahasiswa(router.query.id);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    getMahasiswa(router.query.id);
    getMataKuliahList();
    // getUserByToken();
  }, []);

  return (
    <Box
      justify="center"
      align="center"
      minH="100vh"
      bg={useColorModeValue("`gray.50", "gray.800")}
      pt={5}
      pb={10}
      px={10}
    >
      <Navbar
        user={user}
        handleLogout={handleLogout}
        handleLogin={() => router.push("/login")}
        homepage={() => router.push("/")}
      />
      <Center py={6}>
        <Box
          maxW="5xl"
          w="full"
          bg={useColorModeValue("white", "gray.900")}
          boxShadow="2xl"
          rounded="lg"
          p={6}
          textAlign="center"
        >
          <Avatar
            size="2xl"
            name="Username"
            alt="Avatar Alt"
            mb={4}
            pos="relative"
          />
          <Heading fontSize="2xl" fontFamily="body">
            {mahasiswa.nama}
          </Heading>
          <Text fontWeight={600} color="gray.500" mb={4}>
            {mahasiswa.nim}
          </Text>

          <form onSubmit={addMataKuliah}>
            <FormControl p={8}>
              <InputGroup>
                <Select
                  placeholder="Pilih Mata Kuliah"
                  icon={<MdArrowDropDown />}
                  value={matakuliahId}
                  onChange={(e) => setMatakuliahId(e.target.value)}
                >
                  {matakuliahList &&
                    matakuliahList.map((mkList) => (
                      <option value={mkList._id} key={mkList._id}>
                        {mkList._id + " " + mkList.nama}
                      </option>
                    ))}
                </Select>
                <Button type="submit" size="md" colorScheme="green" mx={4}>
                  Add
                </Button>
              </InputGroup>
            </FormControl>
          </form>
          <Box
            justifyContent="center"
            alignItems="center"
            rounded="lg"
            bg={useColorModeValue("white", "gray.700")}
            p={8}
            boxShadow="lg"
          >
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Kode MK</Th>
                    <Th>Mata Kuliah</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {mahasiswa.matakuliah?.map((mk) => (
                    <Tr key={mk._id}>
                      <Td>{mk._id}</Td>
                      <Td>{mk.nama}</Td>
                      <Td>
                        <Button
                          size="sm"
                          colorScheme="red"
                          onClick={() =>
                            deleteMataKuliah(mk._id, router.query.id)
                          }
                        >
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Center>
    </Box>
  );
};

export default Detail;
