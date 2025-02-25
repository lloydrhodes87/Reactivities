import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import Navbar from "../../features/nav/Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";



const App = () => {
  const [activities, setActivites] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null)
  const [editMode, setEditMode] = useState(false)

  const handleSelectActivity = (id: string) => {
 
    setSelectedActivity(activities.filter(a => a.id === id)[0])
    setEditMode(false)
  }

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true)
  }
  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then(({ data }) => {
        let activities: Array<IActivity> = [];
        data.forEach(activity => {
          activity.date = activity.date.split('.')[0]
          activities.push(activity)
        })
        setActivites(activities);
      });
  }, []);


  const handleCreateActivity = (activity: IActivity) => {
    setActivites([...activities, activity])
    setSelectedActivity(activity)
    setEditMode(false)
  }

  const handleEditActivity = (activity: IActivity) => {
    setActivites([...activities.filter(a => a.id !== activity.id), activity])
    setSelectedActivity(activity)
    setEditMode(false)
  }

  const handleDeleteActivity = (id: string) => {
    setActivites([...activities.filter(a => a.id !== id)])
  }

  return (
    <Fragment>
      <Navbar handleOpenCreateForm={handleOpenCreateForm}/>
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
          activities={activities} 
          selectActivity={handleSelectActivity} 
          selectedActivity={selectedActivity!}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </Fragment>
  );
};

export default App;
