import { intersection } from 'lodash';

export function isLoggedIn() {
	return !! localStorage.getItem('userdetails');
}

export function isArrayWithLength(arr) {
 return (Array.isArray(arr) && arr.length)
}

function conversion() {
    const roles = JSON.parse(localStorage.getItem('access'));
    let temp = [];
    Object.entries(roles).forEach(([key, val]) => {
        if (key != 'employee_id') {
            val.forEach((item) => {
                Object.entries(item).forEach(([k, v]) => {
                    // Object.entries(v).forEach(([KEY, VAL]) => {
                    //     temp.push(KEY)
                    // })
                    temp.push(v)
                })
            })
        }
    })
    return temp;
}
function conversion1() {
    const roles = JSON.parse(localStorage.getItem('access'));
    let temp = [];
    Object.entries(roles).forEach(([key, val]) => {
        if (key != 'employee_id') {
            val.forEach((item) => {
                Object.entries(item).forEach(([k, v]) => {
                    Object.entries(v).forEach(([KEY, VAL]) => {
                        temp.push(KEY)
                    })
                })
            })
        }
    })
    return temp;
}

export function checkPermission(permission) {
    let permit =  conversion1();
    if(!isArrayWithLength(permission)) return true;
    else return intersection(permission, permit).length;
}

export function allowedRoutes(routes) {
    let permit =  conversion1();
    return routes.filter(({ permission }) => {
        if(!permission) return true;
        else if(!isArrayWithLength(permission)) return true;
        else return intersection(permission, permit).length;
    });
}

export function allowed(permission, str = '') {
    let permit2 =  conversion();
    // console.log('checked', permit2)
    if(!isArrayWithLength(permission)) {
        return true;
    } else {
        let bol = false;
        permit2.map(x => {
            Object.entries(x).forEach(([key, val]) => {
                permission.map(y => {
                    if (key === y && val[str] === 1) {
                        bol = true;
                    }
                })
                
            })
        })
        
        return bol;
    }
    
}

export function allowedCheck() {
    let permit2 =  conversion();
    let bol = true;
    permit2.map(x => {
        Object.entries(x).forEach(([key, val]) => {
            if (key != 'audit' && key != 'internal_office') {
                bol = false;
            }
        })
    })        
    return bol;
    
}

export function allowedAudit() {
    let permit2 =  conversion();
    let bol = true;
    permit2.map(x => {
        Object.entries(x).forEach(([key, val]) => {
            if (key != 'audit') {
                bol = false;
            }
        })
    })        
    return bol;
    
}

export function allowedFeed() {
    let permit2 =  conversion();
    let bol = true;
    permit2.map(x => {
        Object.entries(x).forEach(([key, val]) => {
            if (key != 'internal_office' && key != 'audit') {
                bol = false;
            }
        })
    })        
    return bol;
    
}