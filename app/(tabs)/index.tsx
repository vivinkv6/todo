import { Pressable, StyleSheet, TextInput, Text, View } from "react-native";
import { useState } from "react";
import { useMovieStore } from "@/store/movieStore";
export default function TabOneScreen() {
  const [director, setDirector] = useState<string>("");
  const [movie, setMovie] = useState<string>("");

  //store
  const movies = useMovieStore((state) => state.movies);
  const addMovie = useMovieStore((state) => state.addMovie);
  const deleteMovie = useMovieStore((state) => state.deleteMovie);
  let id = movies.length + 1;

  //add director and movie
  const add = () => {
    addMovie({ id, directorName: director, movieName: movie });
    setDirector("");
    setMovie("");
  };

  return (
    <>
      {/* Enter Details */}
      <View style={styles.container}>
        <View style={styles.tableContainer}>
          <TextInput
            style={styles.column}
            value={director}
            onChangeText={setDirector}
            placeholder="Movie Name"
          />
          <TextInput
            style={styles.column}
            value={movie}
            onChangeText={setMovie}
            placeholder="Director Name"
          />
          <Pressable onPress={add}>
            <Text
              style={[
                styles.column,
                { backgroundColor: "gray", fontWeight: "bold" },
              ]}
            >
              Add
            </Text>
          </Pressable>
        </View>

        {/* display detail */}

        {movies.length == 0 ? (
          <Text style={{ textAlign: "center", marginTop: 20 }}>No List</Text>
        ) : (
          <>
            <View
              style={[styles.displayContainer, { backgroundColor: "#edc774" }]}
            >
              <Text style={styles.data}>Director Name</Text>
              <Text style={styles.data}>Movie Name</Text>
              <Text style={styles.data}>Action</Text>
            </View>

            {movies.map((movie) => {
              return (
                <View style={styles.displayContainer}>
                  <Text>{movie.directorName}</Text>
                  <Text>{movie.movieName}</Text>
                  <Pressable onPress={() => deleteMovie(movie.id)}>
                    <Text
                      style={[
                        {
                          backgroundColor: "gray",
                          fontWeight: "bold",
                          padding: 5,
                          borderRadius: 5,
                        },
                      ]}
                    >
                      Delete
                    </Text>
                  </Pressable>
                </View>
              );
            })}
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  tableContainer: {
    flex: 0,
    flexDirection: "row",
  },
  column: {
    borderColor: "black",
    borderWidth: 2,
    height: 50,
    width: 140,
    textAlignVertical: "center",
    textAlign: "center",
  },
  displayContainer: {
    padding: 10,
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderColor: "black",
    borderWidth: 2,
    textAlign: "left",
  },
  data: {
    textAlignVertical: "center",
  },
});
