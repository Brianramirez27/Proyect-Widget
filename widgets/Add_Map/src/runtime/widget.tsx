// imodulos de jimu core
import { React, AllWidgetProps, getAppStore,} from 'jimu-core'
// modulo de la configuracion para el witget
import { IMConfig } from '../config'
import {Provider} from 'react-redux';

//mis componentes 
import MapDefault from './components/map_default'



export default function Widget  (props: AllWidgetProps<IMConfig>)  {

 
// sacamos el estado  para gregarlo al provider
  // const store = getAppStore();
 
  // const store = getAppStore();
  // const MyState=store.getState().MyState.name

  return (
    // <Provider store={store}> 
      <div className="widget-demo jimu-widget m-2">
        <MapDefault mapWidgetId={props.id} config={props.config} />
      </div>
    //  </Provider>
  


)
}







