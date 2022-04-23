import React from 'react'
import { Dialog } from "@material-ui/core";


export default function DialogComponent({openState, handleDialogClose,content}) {
  return (
    <Dialog open={openState} onClose={handleDialogClose}>
        {content}
    </Dialog>
  )
}
