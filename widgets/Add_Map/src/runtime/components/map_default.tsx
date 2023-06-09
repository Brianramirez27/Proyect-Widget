import React, { useRef } from "react"
import { useEffect, useState } from "react"
import "./map_default.css"

// modulos 
import MapView from "esri/views/MapView"
import SceneView from "esri/views/SceneView"
import { JimuMapView, JimuMapViewConstructorOptions, MapViewManager } from "jimu-arcgis"

// css 
import "./map_default.css"
import { Switch } from 'jimu-ui'

import { useDispatch } from "react-redux"
import { addView } from "../Reducer/viewSlice"
import { IMConfig } from '../../config'
import { useSelector } from 'react-redux';
import { AllWidgetProps, getAppStore, IMState } from 'jimu-core'
import { bottom } from "@popperjs/core"
import Result from "dist/widgets/common/print/src/runtime/component/classic/result"

interface Myprosp {
    mapWidgetId: string
    typeMap?: string
    config: IMConfig
}


function MapDefault(props: Myprosp) {

    // const dispatch=useDispatch();
    const [view_actual, setView] = useState<__esri.View>(null);
    const [check_Map3D, setCheck_Map3D] = useState(false)
    const [check_MapBase, setCheck_MapBase] = useState(false)



    // const store = getAppStore();
    // const state= store.getState().MyState

    const mapViewManager = MapViewManager.getInstance();
    const containerMap = useRef();

    const crearMap = async () => {
        if (view_actual == null) {
            const optiones: JimuMapViewConstructorOptions = ({
                mapWidgetId: props.mapWidgetId,
                dataSourceId: "",
                mapViewManager: mapViewManager,
                view: new MapView({
                    container: containerMap.current,
                    map: ({ basemap: "arcgis-streets-night" }),
                    zoom: 1
                })
            });
            const { view } = await mapViewManager.createJimuMapView(optiones)
            setView(view)

            view.ui.add("Switch_Map3D", "top-right")
            view.ui.add("Switch_MapBase", "top-right")
        } else {
            console.log("ya existe algun mapa debe de borrarlo con alguhn metodo")
        }

    }

    async function get_check_Map3D() {
        try {
            let result = await props.config.getIn(["Map_3D"])
            if (result !== undefined) {
                setCheck_Map3D(result)
            }
        } catch (error) {
            console.log("error")
        }
    }
    async function get_check_MapBase() {
        try {
            let result = await props.config.getIn(["Map_Base"])
            if (result !== undefined) {
                setCheck_Map3D(result)
            }
        } catch (error) {
            console.log("error")
        }
    }


    get_check_Map3D()




    useEffect(() => {
        crearMap()
    }, []);



    return (
        <div className="containerMap" id="containerMap" ref={containerMap}>
             
            <div id="Switch_Map3D" >
                <p> {check_Map3D ?"<h1>gfdgdf</h1>" :"no paso"}</p>
            </div>

            <div id="Switch_MapBase" >
                <p className="Switch_p">Map Base</p>
                <Switch ></Switch>
            </div>
        </div>


    )
}

export default MapDefault