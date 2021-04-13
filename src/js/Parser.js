export const Parser = async(url)=>{
    let res = await fetch(url)
    let result = await res.json()
    return result
}