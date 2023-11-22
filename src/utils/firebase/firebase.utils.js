import { initializeApp, getApp } from 'firebase/app'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  limit,
  startAfter,
} from 'firebase/firestore'
import { convertSpaceToDashLowerCase } from '../functions'

const firebaseConfig = initializeApp({
  apiKey: 'AIzaSyC5aexwIReasAWSbc7kKladcJmM5UbTrh0',
  authDomain: 'the-livable.firebaseapp.com',
  projectId: 'the-livable',
  storageBucket: 'the-livable.appspot.com',
  messagingSenderId: '128341915675',
  appId: '1:128341915675:web:3ff3a6441686d43558e0be',
  measurementId: 'G-DJH9E3VGZM',
})

export const app = getApp() || initializeApp(firebaseConfig)

// export const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
export const db = getFirestore()

export const getDocFromFirestore = async (collection, docId) => {
  let docRef = doc(db, collection, docId)

  try {
    const docSnapshot = await getDoc(docRef)
    if (!docSnapshot.exists()) {
      throw new Error('This doc does not exist.')
    }
    const dataMap = { ...docSnapshot.data(), id: docId }
    return JSON.parse(JSON.stringify(dataMap))
  } catch (error) {
    console.error('Error fetching documents:', error)
    throw error
  }
}

export const getDocsFromFirestore = async (queryKey) => {
  // if (Array.isArray(queryKey)) {}
  const collectionRef = collection(db, queryKey)
  const q = query(collectionRef, limit(10))

  try {
    const querySnapshot = await getDocs(q)
    const dataMap = querySnapshot.docs.reduce((acc, doc) => {
      let data = doc.data()
      if (data.published) acc.push({ ...data, id: doc.id })
      return acc
    }, [])
    return JSON.parse(JSON.stringify(dataMap))
  } catch (error) {
    console.error('Error fetching documents:', error)
    throw error
  }
}

export const getMapDocsFromFirestore = async (queryKey) => {
  // if (Array.isArray(queryKey)) {}
  const collectionRef = collection(db, queryKey)
  const q = query(collectionRef)

  try {
    const querySnapshot = await getDocs(q)
    const dataMap = querySnapshot.docs.reduce((acc, doc) => {
      acc[doc.id] = doc.data()
      return acc
    }, {})
    return JSON.parse(JSON.stringify(dataMap))
  } catch (error) {
    console.error('Error fetching documents:', error)
    throw error
  }
}

export const prefetchFromFirestore = async (queryKey, numPerRequest) => {
  // const first = query(collection(db, queryKey), limit(numPerRequest))
  const first = query(collection(db, queryKey))
  const querySnapshot = await getDocs(first)
  const dataMap = querySnapshot.docs.map((doc) => {
    return doc.data()
  })
  return JSON.parse(JSON.stringify(dataMap))
}

// const extractEventObject = (data) => {
//   return {
//         title: data?.title,
//         images: data?.images,
//         tags: data?.tags,
//         calendar: data?.calendar,
//         category: data?.category,
//         description: data?.description,
//         duration: data?.duration,
//         host: data?.host,
//         host_bio: data?.host_bio,
//         price: data?.price,
//         published: data?.published,
//         event_date: data?.event_date
//       }
// }

export const getNextPageDocsFromFirestore = async (queryKey, pageParam) => {
  if (!pageParam) return
  let numPerRequest = 4
  try {
    if (pageParam === 1) {
      // Query the first page of docs
      const first = query(collection(db, queryKey), limit(numPerRequest))
      const querySnapshot = await getDocs(first)
      const dataMap = querySnapshot.docs.reduce((acc, doc) => {
        let data = doc.data()
        if (data.published) acc.push(data)
        return acc
      }, [])

      return { data: dataMap, nextPageParam: nextPageCursor(querySnapshot, pageParam) }
    } else {
      // Construct a new query starting at this document,
      const next = query(collection(db, queryKey), startAfter(pageParam), limit(numPerRequest))
      const querySnapshot = await getDocs(next)
      const dataMap = querySnapshot.docs.reduce((acc, doc) => {
        let data = doc.data()
        if (data.published) acc.push(data)
        return acc
      }, [])

      return { data: dataMap, nextPageParam: nextPageCursor(querySnapshot) }
    }
  } catch (error) {
    console.error('Error fetching documents:', error)
    throw error
  }

  // pass on next page cursor within a querySnapshot
  function nextPageCursor(querySnapshot, pageParam = null) {
    const lastPageParam = querySnapshot?.docs[querySnapshot.docs.length - 1]
    // if (pageParam === 1) return 'first page'
    if (querySnapshot?.size < numPerRequest) {
      // on last page
      return undefined
    }
    return lastPageParam
  }
}

export const addDocToFirestore = async ({ collection, docId, objectToAdd }) => {
  const docRef = doc(db, collection, docId)
  let status = null
  let error = null
  try {
    await setDoc(docRef, objectToAdd, { merge: true })
    status = 'resolved'
  } catch (e) {
    status = 'rejected'
    error = e
  }
  return { status, error }
}

export const addDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, convertSpaceToDashLowerCase(object.id))
    batch.set(docRef, object)
  })

  await batch.commit()
}

export const addCollectionAndDocuments = async (collectionKey, docId, objectsToAdd, field) => {
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)

  objectsToAdd.forEach((object) => {
    const objectId = object.startTime
    const docRef = doc(collectionRef, convertSpaceToDashLowerCase(docId))

    // Note: need to use batch.update if doc already exists, otherwise it overwrites
    batch.update(docRef, { [objectId]: { ...object, stock: 10, price: 350 } })
  })

  await batch.commit()
}
