import React from 'react'
import share from '../assets/share.png';
import closeIcon from '../assets/close.png';
import { Toaster, toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import fb from '../assets/fb.png';
import twtr from '../assets/twtr.png';
import mail from '../assets/mail.png';
import whtsp from '../assets/whts.png';
import msngr from '../assets/msngr.png';

function ShareComp({
    link = '',
}) {

    const handleShareClick = (platform, url) => {
        let shareUrl = '';
        const width = 600;
        const height = 400;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;
        const windowFeatures = `width=${width},height=${height},top=${top},left=${left},resizable,scrollbars=yes,status=1`;
    
        switch (platform) {
          case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
          case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
            break;
          case 'whatsapp':
            shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`;
            break;
          case 'messenger':
            shareUrl = `fb-messenger://share/?link=${encodeURIComponent(url)}`;
            break;
          case 'email':
            shareUrl = `mailto:?subject=Check this out&body=${encodeURIComponent(url)}`;
            break;
          default:
            return;
        }
    
        window.open(shareUrl, '_blank', windowFeatures);
      };
  return (
    <>
        <AlertDialog>
                <AlertDialogTrigger className='absolute top-[123px] right-3 bg-transparent hover:scale-105'>
                  <img
                    className='w-8 h-8 object-contain'
                    src={share} alt="shareFont" />
                </AlertDialogTrigger>
                <AlertDialogContent className='w-80'>
                  <AlertDialogHeader>
                    <AlertDialogTitle className='text-center mb-5'>Share</AlertDialogTitle>
                    <AlertDialogDescription className='space-y-6'>
                      <div className='flex items-center gap-3 cursor-pointer' onClick={() => handleShareClick('facebook', window.location.href + link)}>
                        <img className='w-6 h-6 object-contain' src={fb} alt="fontShareFacebook" />
                        <p className='font-semibold text-black'>Share on Facebook</p>
                      </div>
                      <div className='flex items-center gap-3 cursor-pointer' onClick={() => handleShareClick('whatsapp', window.location.href + link)}>
                        <img className='w-6 h-6 object-contain' src={whtsp} alt="fontShareWhatsApp" />
                        <p className='font-semibold text-black'>Share on WhatsApp</p>
                      </div>
                      <div className='flex items-center gap-3 cursor-pointer' onClick={() => handleShareClick('twitter', window.location.href + link)}>
                        <img className='w-6 h-6 object-contain' src={twtr} alt="fontShareTwitter" />
                        <p className='font-semibold text-black'>Share on Twitter</p>
                      </div>
                      <div className='flex items-center gap-3 cursor-pointer' onClick={() => handleShareClick('messenger', window.location.href + link)}>
                        <img className='w-6 h-6 object-contain' src={msngr} alt="fontShareMessenger" />
                        <p className='font-semibold text-black'>Share on Messenger</p>
                      </div>
                      <div className='flex items-center gap-3 cursor-pointer' onClick={() => handleShareClick('email', window.location.href + link)}>
                        <img className='w-6 h-6 object-contain' src={mail} alt="fontShareEmail" />
                        <p className='font-semibold text-black'>Share via Email</p>
                      </div>
                      <div className='cursor-pointer flex justify-center'>
                        <input
                          className='font-monsterrat font-semibold text-[12px] border-l-2 border-t-2 border-b-2 rounded-l-md border-black/20 px-2 py-1 w-3/5 outline-none'
                          type="text" value={window.location.href + link} readOnly />
                        <button
                          type='button'
                          onClick={() => (navigator.clipboard.writeText(window.location.href + link), toast.success('Copied to clipboard!'))}
                          className='rounded-r-md bg-black/20 px-2 font-monsterrat text-sm text-black font-semibold hover:bg-black/40' >Copy Link</button>
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className='absolute top-2 right-0 bg-transparent'>
                      <img className='w-5 h-5 object-contain' src={closeIcon} alt="closeFontPopUp" />
                    </AlertDialogCancel>
                    {/* <AlertDialogAction>Continue</AlertDialogAction> */}
                  </AlertDialogFooter>
                </AlertDialogContent>
        </AlertDialog>

        <Toaster richColors />
    </>
  )
}

export default ShareComp