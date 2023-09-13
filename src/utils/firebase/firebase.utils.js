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

export const getEventsFirestore = async () => {
  const collectionRef = collection(db, 'events')
  const q = query(collectionRef)

  const querySnapshot = await getDocs(q)
  const categoryMap = querySnapshot.docs.map((doc) => {
    // doc.data() is the document data
    // console.log(doc.id, ' => ', doc.data())
    return doc.data()
  })
  //   const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
  //     const { title, items } = docSnapshot.data()
  //     acc[title.toLowerCase()] = items
  //     return acc
  //   }, {})
  return categoryMap
}

export const getDocsFromFirestore = async (queryKey) => {
  // if (Array.isArray(queryKey)) {}
  const collectionRef = collection(db, queryKey)
  const q = query(collectionRef)

  const querySnapshot = await getDocs(q)
  const dataMap = querySnapshot.docs.map((doc) => {
    // doc.data() is the document data
    // console.log(doc.id, ' => ', doc.data())
    return doc.data()
  })
  return dataMap
}

export const getMapDocsFromFirestore = async (queryKey) => {
  // if (Array.isArray(queryKey)) {}
  const collectionRef = collection(db, queryKey)
  const q = query(collectionRef)

  const querySnapshot = await getDocs(q)

  const dataMap = querySnapshot.docs.reduce((acc, doc) => {
    // doc.data() is the document data
    acc[doc.id] = doc.data()
    return acc
  }, {})
  return dataMap
}

export const prefetchFromFirestore = async (queryKey, numPerRequest) => {
  const first = query(collection(db, queryKey), limit(numPerRequest))
  const querySnapshot = await getDocs(first)
  const dataMap = querySnapshot.docs.map((doc) => {
    return doc.data()
  })
  return dataMap
}

export const getNextPageDocsFromFirestore = async (queryKey, pageParam) => {
  if (!pageParam) return
  let numPerRequest = 10
  if (pageParam === 1) {
    // Query the first page of docs
    const first = query(collection(db, queryKey), limit(numPerRequest))
    const querySnapshot = await getDocs(first)
    const dataMap = querySnapshot.docs.map((doc) => {
      return doc.data()
    })

    return { data: dataMap, nextPageParam: nextPageCursor(querySnapshot) }
  } else {
    // Construct a new query starting at this document,
    const next = query(collection(db, queryKey), startAfter(pageParam), limit(numPerRequest))
    const querySnapshot = await getDocs(next)
    const dataMap = querySnapshot.docs.map((doc) => {
      return doc.data()
    })

    return { data: dataMap, nextPageParam: nextPageCursor(querySnapshot) }
  }

  // pass on next page cursor within a querySnapshot
  function nextPageCursor(querySnapshot) {
    const lastPageParam = querySnapshot?.docs[querySnapshot.docs.length - 1]
    if (querySnapshot?.size < numPerRequest) {
      return undefined
    }
    return lastPageParam
  }
}

export const addDocToFirestore = async (collection, docId, objectToAdd) => {
  const docRef = doc(db, collection, docId)
  let result = null
  let error = null
  try {
    result = await setDoc(docRef, objectToAdd, { merge: true })
  } catch (e) {
    error = e
  }
  return { result, error }
}

export const getDocFromFirestore = async (collection, docId) => {
  let docRef = doc(db, collection, docId)
  let result = null
  let error = null

  try {
    const docSnapshot = await getDoc(docRef)
    if (docSnapshot.exists()) {
      result = docSnapshot.data()
    } else {
      error = 'Document does not exist.'
    }
  } catch (e) {
    error = e
  }
  return { result, error }
}
