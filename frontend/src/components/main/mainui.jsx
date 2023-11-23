import React, {useState, useMemo, useEffect} from 'react'
import { useTable } from 'react-table'
import './mainui.css'


const UI = () => {

    const [popup, setPopup] = useState(false)

    const [reglevel, setReglevel] = useState(false)
    const [rid, setRid] = useState(false)
    const [tid, setTid] = useState(false)
    const [sid, setSid] = useState(false)
    const [rcom, setRcom] = useState(false)
    const [prid, setPrid] = useState(false)
    const [msg, setMsg] = useState(false)

    const [data, setData] = useState([])

    const [linp, setLinp] = useState("")
    const [ts, setTs] = useState("")
    const [es, setEs] = useState("")
    const [rinp, setRinp] = useState("")
    const [tinp, setTinp] = useState("")
    const [sinp, setSinp] = useState("")
    const [cinp, setCinp] = useState("")
    const [pinp, setPinp] = useState("")
    const [minp, setMinp] = useState("")

    const updateLevel = (e) => {
        setLinp(e.target.value)
    }

    const updateStime = (e) => {
        setTs(e.target.value)
    }

    const updateEtime = (e) => {
        setEs(e.target.value)
    }

    const updateRid = (e) => {
        setRinp(e.target.value)
    }

    const updateTid = (e) => {
        setTinp(e.target.value)
    }

    const updateCommit = (e) => {
        setCinp(e.target.value)
    }

    const updateSid = (e) => {
        setSinp(e.target.value)
    }

    const updatePid= (e) => {
        setPinp(e.target.value)
    }

    const updateMsg= (e) => {
        setMinp(e.target.value)
    }

    const mapper = [
        {
            Header: 'Level',
            accessor: 'level'
        },
        {
            Header: 'Message',
            accessor: 'message'
        },
        {
            Header: 'resourceId',
            accessor: 'resourceId'
        },
        {
            Header: 'Timestamp',
            accessor: 'timestamp'
        },
        {
            Header: 'traceId',
            accessor: 'traceId'
        },
        {
            Header: 'spanId',
            accessor: 'spanId'
        },
        {
            Header: 'Commit',
            accessor: 'commit'
        },
        {
            Header: 'parentResourcId',
            accessor: 'metadata.parentResourceId'
        }
    ]

    const cols = useMemo(() => mapper, [])

    const tableObj = useTable({
        columns: cols,
        data: data
    })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableObj

    const LoadData = async () => {
        let url = "http://localhost:3000/api/filter"
        let apidata = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        })

        let parsedData = await apidata.json()
        setData(parsedData.map((obj) => obj._source))
    }

    const onApply = async () => {
        let url = "http://localhost:3000/api/filter"
        let query = {}

        if(linp !== "") {
            query.level = {"data": linp, regex: reglevel}
        }

        if(rinp !== "") {
            query.resourceId = {"data": rinp, regex: rid}
        }

        if(sinp !== "") {
            query.spanId = {"data": sinp, regex: sid}
        }

        if(cinp !== "") {
            query.commit = {"data": cinp, regex: rcom}
        }

        if(pinp !== "") {
            query.parentResourceId = {"data": pinp, regex: prid}
        }

        if(minp !== "") {
            query.message = {"data": minp, regex: msg}
        }

        if(ts !== "" && es !== "") {
            query.timestamp = {start: ts, end: es}
        }

        console.log(query)

        let apidata = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(query)
        })

        let parsedData = await apidata.json()
        setData(parsedData.map((obj) => obj._source))
    }

    const onClear = () => {
        setReglevel(false)
        setRid(false)
        setTid(false)
        setRcom(false)
        setPrid(false)
        setMsg(false)

        setLinp("")
        setTs("")
        setEs("")
        setRinp("")
        setTinp("")
        setSinp("")
        setCinp("")
        setPinp("")
        setMinp("")

        LoadData()
    }

    const displayPopup = () => {
        setPopup(!popup)
    }

    useEffect(() => {
        LoadData()
    }, [])

  return (
    <div>
        <div className='header'>
            <div onClick={displayPopup} className='filter_btn'>
                <span>Filters</span>
            </div>
            <div className='record'>
                <span>Enter number of logs to return</span>
                <input type="text" placeholder='10000 (default)'/>
            </div>
        </div>
        {popup && <div className='filter_container'>
        <div>
            <span>Timestamp Start</span>
            <input type="text" value={ts} onChange={updateStime}/>
        </div>

        <div>
            <span>Timestamp End</span>
            <input type="text" value={es} onChange={updateEtime}/>
        </div>

        <div>
            <span>Level</span>
            <div className='reg'>
                <span>Regex</span>
                <input type="checkbox" checked={reglevel} onChange={(e) => setReglevel(!reglevel)}/>
            </div>
            <input type="text" value={linp} onChange={updateLevel}/>
        </div>

        <div>
            <span>resouceID</span>
            <div className='reg'>
                <span>Regex</span>
                <input type="checkbox" checked={rid} onChange={(e) => setRid(!rid)}/>
            </div>
            <input type="text" value={rinp} onChange={updateRid}/>
        </div>

        <div>
            <span>traceID</span>
            <div className='reg'>
                <span>Regex</span>
                <input type="checkbox" checked={tid} onChange={(e) => setTid(!tid)}/>
            </div>
            <input type="text" value={tinp} onChange={updateTid}/>
        </div>

        <div>
            <span>spanID</span>
            <div className='reg'>
                <span>Regex</span>
                <input type="checkbox" checked={sid} onChange={(e) => setSid(!sid)}/>
            </div>
            <input type="text" value={sinp} onChange={updateSid}/>
        </div>

        <div>
            <span>Commit</span>
            <div className='reg'>
                <span>Regex</span>
                <input type="checkbox" checked={rcom} onChange={(e) => setRcom(!rcom)}/>
            </div>
            <input type="text" value={cinp} onChange={updateCommit}/>
        </div>

        <div>
            <span>parentResourceId</span>
            <div className='reg'>
                <span>Regex</span>
                <input type="checkbox" checked={prid} onChange={(e) => setPrid(!prid)}/>
            </div>
            <input type="text" value={pinp} onChange={updatePid}/>
        </div>

        <div>
            <span>Message</span>
            <div className='reg'>
                <span>Regex</span>
                <input type="checkbox" checked={msg} onChange={(e) => setMsg(!msg)}/>
            </div>
            <input type="text" value={minp} onChange={updateMsg}/>
        </div>
        <button onClick={onApply}>Apply Filters</button>
        <button onClick={onClear}>Clear Filters</button>
        <button onClick={() => setPopup(false)}>Close</button>
        </div>}
        
        <table {...getTableProps()}>
        <thead>
            {
                headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))
            }
        </thead>
        <tbody {...getTableBodyProps()}>
            {
                rows.map((row) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {
                                row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })
                            }
                        </tr>
                    )
                })
            }
        </tbody>
        </table>
    </div>
  )
}

export default UI