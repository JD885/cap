import React, {useState,useContext}from 'react';
import { Link, withRouter } from "react-router-dom";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {TabPanel} from '../../../components/tab-panel';
import { ABSCRUD } from './absCRUD';
import {AbsDisplay} from './absDisplay';
import {AbsCreate} from './absCreate';
import { GlobalContext, handleTab } from '../../../stores/global-store';
import { translate } from "../../../constants/translate";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}




export const Abs = withRouter(({ history, match }) => {

  //TEMPORARY STYLING
  const listItemStyle = {
    height: '15vh'
  };
  const listItemTextStyle = { display: "flex", justifyContent: 'center' };

  const store = useContext(GlobalContext);

  const [tabIndex, setTab] = useState(store.backTab);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
    const tab: handleTab= {
      tab:newValue
    };
    store.changeTab(tab);
  };

  function a11yProps(index: any) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const translations = translate.use().abs;

  
  return (
   
    <>

      <Tabs
        value={tabIndex}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label={translations.create} {...a11yProps(0)} />
        <Tab label={translations.view} {...a11yProps(1)} />
        <Tab label={translations.update} {...a11yProps(2)} />

      </Tabs>

      <TabPanel value={tabIndex} index={0}>
        <AbsCreate/>
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <AbsDisplay/>
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
       <ABSCRUD/>
      </TabPanel>
    </>
  );
});
