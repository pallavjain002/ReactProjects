
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, Button, FlatList } from "react-native";

// imports

import Goalitem from "./Component/GoalItem";
import GoalInput from "./Component/GoalInput";

// imports //
export default function App() {
  const [CourseGoals, SetCourseGoals] = useState([]);
  const [isAddMode, setAddMode] = useState(false);

  const addGoalHandler = (GoalTitle) => {
    if(GoalTitle.length === 0)
    {
      console.log("Please enter a goal");
      return;
    }
    SetCourseGoals((currentGoals) => [
      ...CourseGoals,
      { id: Math.random().toString(), value: GoalTitle },
    ]);
    setAddMode(false);
  };

  const removeGoalHandler = (goalId) => {
    SetCourseGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id !== goalId);
    });
  };

  const cancelGoalHandler = () => {
    setAddMode(false);
  };

  return (
    <View style={styles.screen}>
      <Button title="Add a new Goal" onPress={() => setAddMode(true)} />
      <GoalInput
        visible={isAddMode}
        onAddGoal={addGoalHandler}
        onCancel={cancelGoalHandler}
      />
      <FlatList
        //Used when we use uid intead of id/key keyExtractor={(item, index) => item.uid}
        data={CourseGoals}
        renderItem={(itemData) => (
          <Goalitem
            id={itemData.item.id}
            onDelete={removeGoalHandler}
            title={itemData.item.value}
          />
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: "10%",
  },
});
